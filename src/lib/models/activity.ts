import { Collection, Filter } from 'mongodb';
import { getCollection } from '../mongodb';

const COLLECTION_NAME = 'activities';

export interface LapData {
    lapIndex: number;
    startIndex: number;
    endIndex: number;
    elapsedTime: number;
    movingTime: number;
    distance: number;
    manualDistance?: number;
    manualMovingTime?: number;
    averageSpeed?: number;
    maxSpeed?: number;
    averageHeartrate?: number;
    maxHeartrate?: number;
    averageWatts?: number;
    averageCadence?: number;
}

export interface StreamData {
    time?: number[];
    heartrate?: number[];
    watts?: number[];
    cadence?: number[];
    altitude?: number[];
    velocity_smooth?: number[];
    grade_smooth?: number[];
}

export interface ActivityDocument {
    meta?: unknown; // Placeholder for flexible metadata
    stravaId: number;
    athleteStravaId: number;
    name: string;
    description?: string;
    isTreadmill?: boolean;
    type: string;
    sportType: string;
    startDate: Date;
    startDateLocal: Date;
    timezone: string;
    distance: number;
    movingTime: number;
    manualDistance?: number;
    manualMovingTime?: number;
    elapsedTime: number;
    totalElevationGain: number;
    averageSpeed?: number;
    maxSpeed?: number;
    averageHeartrate?: number;
    maxHeartrate?: number;
    averageWatts?: number;
    maxWatts?: number;
    weightedAverageWatts?: number;
    averageCadence?: number;
    calories?: number;
    sufferScore?: number;
    hasHeartrate: boolean;
    deviceWatts: boolean;
    laps?: LapData[];
    streams?: StreamData;
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * Get the activities collection with indexes ensured
 */
export async function getActivitiesCollection(): Promise<Collection<ActivityDocument>> {
    const collection = await getCollection(COLLECTION_NAME);

    // Ensure indexes (idempotent operation)
    await collection.createIndex({ stravaId: 1 }, { unique: true });
    await collection.createIndex({ athleteStravaId: 1, startDate: -1 });
    await collection.createIndex({ athleteStravaId: 1, type: 1 });

    return collection as unknown as Collection<ActivityDocument>;
}

/**
 * Find an activity by its Strava ID
 */
export async function findActivityByStravaId(stravaId: number | string): Promise<ActivityDocument | null> {
    const collection = await getActivitiesCollection();
    return collection.findOne({ stravaId: Number(stravaId) } as Filter<ActivityDocument>);
}

interface FindActivitiesOptions {
    startDate?: Date;
    endDate?: Date;
    type?: string;
    limit?: number;
}

/**
 * Find activities for an athlete within a date range
 */
export async function findActivitiesForAthlete(athleteStravaId: number | string, options: FindActivitiesOptions = {}): Promise<ActivityDocument[]> {
    const collection = await getActivitiesCollection();

    const query: Filter<ActivityDocument> = { athleteStravaId: Number(athleteStravaId) };

    if (options.startDate || options.endDate) {
        const dateQuery: Record<string, Date> = {};
        if (options.startDate) dateQuery.$gte = options.startDate;
        if (options.endDate) dateQuery.$lte = options.endDate;
        query.startDate = dateQuery;
    }

    if (options.type) {
        query.type = options.type;
    }

    return collection
        .find(query)
        .sort({ startDate: -1 })
        .limit(options.limit || 50)
        .toArray() as unknown as ActivityDocument[];
}

/**
 * Find today's activities for an athlete
 */
export async function findTodaysActivities(athleteStravaId: number | string): Promise<ActivityDocument[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return findActivitiesForAthlete(athleteStravaId, {
        startDate: today,
        endDate: tomorrow,
    });
}

/**
 * Upsert an activity document
 */
export async function upsertActivity(stravaId: number | string, data: Partial<ActivityDocument>): Promise<any> {
    const collection = await getActivitiesCollection();

    const now = new Date();
    // Remove _id from data if present to avoid immutable field error on update
    const { _id, ...updateData } = data as any;

    const result = await collection.findOneAndUpdate(
        { stravaId: Number(stravaId) } as Filter<ActivityDocument>,
        {
            $set: {
                ...updateData,
                stravaId: Number(stravaId),
                updatedAt: now,
            },
            $setOnInsert: {
                createdAt: now,
            },
        } as unknown as any, // Type casting due to complex MongoDB update types
        {
            upsert: true,
            returnDocument: 'after',
        }
    );

    return result;
}

/**
 * Bulk upsert activities
 */
export async function bulkUpsertActivities(activities: Array<{ stravaId: number | string, data: Partial<ActivityDocument> }>): Promise<{ upsertedCount: number, modifiedCount: number }> {
    const collection = await getActivitiesCollection();
    const now = new Date();

    const operations = activities.map(({ stravaId, data }) => {
        const { _id, ...updateData } = data as any;
        return {
            updateOne: {
                filter: { stravaId: Number(stravaId) },
                update: {
                    $set: {
                        ...updateData,
                        stravaId: Number(stravaId),
                        updatedAt: now,
                    },
                    $setOnInsert: {
                        createdAt: now,
                    },
                },
                upsert: true,
            },
        };
    });

    const result = await collection.bulkWrite(operations);

    return {
        upsertedCount: result.upsertedCount,
        modifiedCount: result.modifiedCount,
    };
}

/**
 * Get the latest synced activity date for an athlete
 */
export async function getLatestActivityDate(athleteStravaId: number | string): Promise<Date | null> {
    const collection = await getActivitiesCollection();

    const latest = await collection
        .find({ athleteStravaId: Number(athleteStravaId) } as Filter<ActivityDocument>)
        .sort({ startDate: -1 })
        .limit(1)
        .toArray();

    return latest.length > 0 ? latest[0].startDate : null;
}

/**
 * Check which Strava IDs already exist in the database
 */
export async function findExistingStravaIds(stravaIds: (number | string)[]): Promise<number[]> {
    if (!stravaIds || stravaIds.length === 0) return [];

    const collection = await getActivitiesCollection();

    const found = await collection
        .find({ stravaId: { $in: stravaIds.map(Number) } } as Filter<ActivityDocument>)
        .project({ stravaId: 1 })
        .toArray();

    return found.map(doc => doc.stravaId);
}
