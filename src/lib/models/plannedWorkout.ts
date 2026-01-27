import { Collection, Filter } from 'mongodb';
import { getCollection } from '../mongodb';
import { AnyWorkout } from './workout';

const COLLECTION_NAME = 'planned_workouts';

export type PlannedWorkoutDocument = AnyWorkout & {
    _id?: any;
    athleteStravaId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * Get the planned workouts collection
 */
export async function getPlannedWorkoutsCollection(): Promise<Collection<PlannedWorkoutDocument>> {
    const collection = await getCollection(COLLECTION_NAME);

    // Ensure indexes
    await collection.createIndex({ athleteStravaId: 1, fullDate: 1 });
    await collection.createIndex({ fullDate: 1 });

    return collection as unknown as Collection<PlannedWorkoutDocument>;
}

/**
 * Fetch planned workouts for a date range
 */
export async function findPlannedWorkouts(athleteStravaId: number, startDate: string, endDate: string): Promise<PlannedWorkoutDocument[]> {
    const collection = await getPlannedWorkoutsCollection();

    // String comparison for YYYY-MM-DD works if ISO format is strict
    return collection.find({
        athleteStravaId: Number(athleteStravaId),
        fullDate: { $gte: startDate, $lte: endDate }
    } as Filter<PlannedWorkoutDocument>).toArray() as unknown as PlannedWorkoutDocument[];
}

/**
 * Save (Upsert) a batch of planned workouts
 * Matches by athleteStravaId + fullDate + type to avoid duplicates on regeneration
 */
export async function savePlannedWorkouts(athleteStravaId: number, workouts: AnyWorkout[]): Promise<void> {
    const collection = await getPlannedWorkoutsCollection();
    const now = new Date();

    const operations = workouts.map(w => ({
        updateOne: {
            filter: {
                athleteStravaId: Number(athleteStravaId),
                fullDate: w.fullDate,
                type: w.type
            },
            update: {
                $set: {
                    ...w,
                    athleteStravaId: Number(athleteStravaId),
                    updatedAt: now
                },
                $setOnInsert: {
                    createdAt: now
                }
            },
            upsert: true
        }
    }));

    if (operations.length > 0) {
        await collection.bulkWrite(operations);
    }
}

/**
 * Delete future workouts (e.g. before regenerating)
 * Optional: keep history, only delete future
 */
export async function deleteFutureWorkouts(athleteStravaId: number, fromDate: string): Promise<void> {
    const collection = await getPlannedWorkoutsCollection();
    await collection.deleteMany({
        athleteStravaId: Number(athleteStravaId),
        fullDate: { $gte: fromDate }
    } as Filter<PlannedWorkoutDocument>);
}
