import { getCollection } from '../mongodb';

const COLLECTION_NAME = 'activities';

/**
 * @typedef {Object} LapData
 * @property {number} lapIndex - Lap number (0-indexed)
 * @property {number} startIndex - Start index in streams
 * @property {number} endIndex - End index in streams
 * @property {number} elapsedTime - Total elapsed time in seconds
 * @property {number} movingTime - Moving time in seconds
 * @property {number} distance - Distance in meters
 * @property {number} [manualDistance] - Manually overridden distance in meters
 * @property {number} [manualMovingTime] - Manually overridden moving time in seconds
 * @property {number} [averageSpeed] - Average speed in m/s
 * @property {number} [maxSpeed] - Max speed in m/s
 * @property {number} [averageHeartrate] - Average heart rate
 * @property {number} [maxHeartrate] - Max heart rate
 * @property {number} [averageWatts] - Average power in watts
 * @property {number} [averageCadence] - Average cadence
 */

/**
 * @typedef {Object} StreamData
 * @property {number[]} [time] - Time in seconds from start
 * @property {number[]} [heartrate] - Heart rate in bpm
 * @property {number[]} [watts] - Power in watts
 * @property {number[]} [cadence] - Cadence (rpm or spm)
 * @property {number[]} [altitude] - Altitude in meters
 * @property {number[]} [velocity_smooth] - Smoothed velocity in m/s
 * @property {number[]} [grade_smooth] - Smoothed grade percentage
 */

/**
 * @typedef {Object} ActivityDocument
 * @property {number} stravaId - Strava activity ID (unique)
 * @property {number} athleteStravaId - Strava athlete ID (owner)
 * @property {string} name - Activity name
 * @property {string} [description] - Activity description
 * @property {boolean} [isTreadmill] - Whether this is a treadmill run
 * @property {string} type - Activity type (Run, Ride, Swim, etc.)
 * @property {string} sportType - Sport type (more specific)
 * @property {Date} startDate - Activity start timestamp
 * @property {Date} startDateLocal - Local start timestamp
 * @property {string} timezone - Timezone string
 * @property {number} distance - Distance in meters
 * @property {number} movingTime - Moving time in seconds
 * @property {number} [manualDistance] - Manually overridden distance in meters
 * @property {number} [manualMovingTime] - Manually overridden moving time in seconds
 * @property {number} elapsedTime - Total elapsed time in seconds
 * @property {number} totalElevationGain - Elevation gain in meters
 * @property {number} [averageSpeed] - Average speed in m/s
 * @property {number} [maxSpeed] - Max speed in m/s
 * @property {number} [averageHeartrate] - Average heart rate
 * @property {number} [maxHeartrate] - Max heart rate
 * @property {number} [averageWatts] - Average power (cycling)
 * @property {number} [maxWatts] - Max power (cycling)
 * @property {number} [weightedAverageWatts] - Normalized power
 * @property {number} [averageCadence] - Average cadence
 * @property {number} [calories] - Estimated calories
 * @property {number} [sufferScore] - Strava suffer score
 * @property {boolean} hasHeartrate - Whether HR data present
 * @property {boolean} deviceWatts - Whether power from device
 * @property {LapData[]} [laps] - Lap data array
 * @property {StreamData} [streams] - Time-series data (no GPS)
 * @property {Date} createdAt - Document creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

/**
 * Get the activities collection with indexes ensured
 * @returns {Promise<import('mongodb').Collection<ActivityDocument>>}
 */
export async function getActivitiesCollection() {
    const collection = await getCollection(COLLECTION_NAME);

    // Ensure indexes (idempotent operation)
    await collection.createIndex({ stravaId: 1 }, { unique: true });
    await collection.createIndex({ athleteStravaId: 1, startDate: -1 });
    await collection.createIndex({ athleteStravaId: 1, type: 1 });

    return collection;
}

/**
 * Find an activity by its Strava ID
 * @param {number} stravaId 
 * @returns {Promise<ActivityDocument | null>}
 */
export async function findActivityByStravaId(stravaId) {
    const collection = await getActivitiesCollection();
    return collection.findOne({ stravaId: Number(stravaId) });
}

/**
 * Find activities for an athlete within a date range
 * @param {number} athleteStravaId 
 * @param {Object} options
 * @param {Date} [options.startDate] - Start of date range
 * @param {Date} [options.endDate] - End of date range
 * @param {string} [options.type] - Filter by activity type
 * @param {number} [options.limit] - Max results (default: 50)
 * @returns {Promise<ActivityDocument[]>}
 */
export async function findActivitiesForAthlete(athleteStravaId, options = {}) {
    const collection = await getActivitiesCollection();

    const query = { athleteStravaId: Number(athleteStravaId) };

    if (options.startDate || options.endDate) {
        query.startDate = {};
        if (options.startDate) query.startDate.$gte = options.startDate;
        if (options.endDate) query.startDate.$lte = options.endDate;
    }

    if (options.type) {
        query.type = options.type;
    }

    return collection
        .find(query)
        .sort({ startDate: -1 })
        .limit(options.limit || 50)
        .toArray();
}

/**
 * Find today's activities for an athlete
 * @param {number} athleteStravaId 
 * @returns {Promise<ActivityDocument[]>}
 */
export async function findTodaysActivities(athleteStravaId) {
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
 * @param {number} stravaId 
 * @param {Partial<ActivityDocument>} data 
 * @returns {Promise<ActivityDocument>}
 */
export async function upsertActivity(stravaId, data) {
    const collection = await getActivitiesCollection();

    const now = new Date();
    const result = await collection.findOneAndUpdate(
        { stravaId: Number(stravaId) },
        {
            $set: {
                ...data,
                stravaId: Number(stravaId),
                updatedAt: now,
            },
            $setOnInsert: {
                createdAt: now,
            },
        },
        {
            upsert: true,
            returnDocument: 'after',
        }
    );

    return result;
}

/**
 * Bulk upsert activities
 * @param {Array<{stravaId: number, data: Partial<ActivityDocument>}>} activities 
 * @returns {Promise<{upsertedCount: number, modifiedCount: number}>}
 */
export async function bulkUpsertActivities(activities) {
    const collection = await getActivitiesCollection();
    const now = new Date();

    const operations = activities.map(({ stravaId, data }) => ({
        updateOne: {
            filter: { stravaId: Number(stravaId) },
            update: {
                $set: {
                    ...data,
                    stravaId: Number(stravaId),
                    updatedAt: now,
                },
                $setOnInsert: {
                    createdAt: now,
                },
            },
            upsert: true,
        },
    }));

    const result = await collection.bulkWrite(operations);

    return {
        upsertedCount: result.upsertedCount,
        modifiedCount: result.modifiedCount,
    };
}

/**
 * Get the latest synced activity date for an athlete
 * @param {number} athleteStravaId 
 * @returns {Promise<Date | null>}
 */
export async function getLatestActivityDate(athleteStravaId) {
    const collection = await getActivitiesCollection();

    const latest = await collection
        .find({ athleteStravaId: Number(athleteStravaId) })
        .sort({ startDate: -1 })
        .limit(1)
        .toArray();

    return latest.length > 0 ? latest[0].startDate : null;
}

/**
 * Check which Strava IDs already exist in the database
 * @param {number[]} stravaIds - List of Strava IDs to check
 * @returns {Promise<number[]>} - List of found Strava IDs
 */
export async function findExistingStravaIds(stravaIds) {
    if (!stravaIds || stravaIds.length === 0) return [];

    const collection = await getActivitiesCollection();

    const found = await collection
        .find({ stravaId: { $in: stravaIds.map(Number) } })
        .project({ stravaId: 1 })
        .toArray();

    return found.map(doc => doc.stravaId);
}
