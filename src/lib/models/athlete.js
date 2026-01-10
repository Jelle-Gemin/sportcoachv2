import { getCollection } from '../mongodb';

const COLLECTION_NAME = 'athletes';

/**
 * @typedef {Object} AthleteDocument
 * @property {number} stravaId - Strava athlete ID
 * @property {string} accessToken - Current OAuth access token
 * @property {string} refreshToken - Long-lived refresh token
 * @property {number} expiresAt - Token expiration timestamp (seconds)
 * @property {Object} athlete - Strava athlete profile data
 * @property {Object} [biometrics] - Athlete biometrics
 * @property {number} [biometrics.weight] - Weight in kg
 * @property {number} [biometrics.height] - Height in cm
 * @property {number} [biometrics.restingHR] - Resting Heart Rate
 * @property {number} [biometrics.maxHR] - Max Heart Rate
 * @property {number} [biometrics.ftp] - FTP in Watts
 * @property {string} [biometrics.css] - Critical Swim Speed (MM:SS)
 * @property {Object} [trainingZones] - calculated or overridden zones
 * @property {Object} [trainingZones.hr] - Heart Rate Zones
 * @property {Object} [trainingZones.cycling] - Cycling Power Zones
 * @property {Object} [trainingZones.swimming] - Swimming Pace Zones
 * @property {Array<{title: string, date: string, location: string, priority: string, distance: string, goalTime: string, estimatedTime: string, progress: number}>} [seasonGoals] - Season goals/races
 * @property {Date} createdAt - Document creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

/**
 * Get the athletes collection with indexes ensured
 * @returns {Promise<import('mongodb').Collection<AthleteDocument>>}
 */
export async function getAthletesCollection() {
    const collection = await getCollection(COLLECTION_NAME);

    // Ensure indexes (idempotent operation)
    await collection.createIndex({ stravaId: 1 }, { unique: true });

    return collection;
}

/**
 * Find an athlete by their Strava ID
 * @param {number} stravaId 
 * @returns {Promise<AthleteDocument | null>}
 */
export async function findAthleteByStravaId(stravaId) {
    const collection = await getAthletesCollection();
    return collection.findOne({ stravaId: Number(stravaId) });
}

/**
 * Create or update an athlete document
 * @param {number} stravaId 
 * @param {Partial<AthleteDocument>} data 
 * @returns {Promise<AthleteDocument>}
 */
export async function upsertAthlete(stravaId, data) {
    const collection = await getAthletesCollection();

    const now = new Date();
    const result = await collection.findOneAndUpdate(
        { stravaId },
        {
            $set: {
                ...data,
                stravaId,
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
 * Update athlete tokens
 * @param {number} stravaId 
 * @param {string} accessToken 
 * @param {string} refreshToken 
 * @param {number} expiresAt 
 * @returns {Promise<void>}
 */
export async function updateAthleteTokens(stravaId, accessToken, refreshToken, expiresAt) {
    const collection = await getAthletesCollection();

    await collection.updateOne(
        { stravaId },
        {
            $set: {
                accessToken,
                refreshToken,
                expiresAt,
                updatedAt: new Date(),
            },
        }
    );
}
