import { Collection } from 'mongodb';
import { getCollection } from '../mongodb';

const COLLECTION_NAME = 'athletes';

export interface AthleteDocument {
    stravaId: number;
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    athlete: {
        firstname?: string;
        lastname?: string;
        profile?: string;
        city?: string;
        state?: string;
        country?: string;
        [key: string]: any;
    };
    biometrics?: {
        weight: number;
        height: number;
        restingHR: number;
        maxHR: number;
        ftp: number;
        css: string;
    };
    trainingZones?: {
        hr: any[];
        cycling: any[];
        swimming: any[];
        running: any[];
    };
    seasonGoals?: Array<{
        title: string;
        date: string;
        location: string;
        priority: string;
        distance: string;
        goalTime: string;
        estimatedTimeMin?: string;
        estimatedTimeMax?: string;
        progress: number;
    }>;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Get the athletes collection with indexes ensured
 * @returns {Promise<Collection<AthleteDocument>>}
 */
export async function getAthletesCollection(): Promise<Collection<AthleteDocument>> {
    const collection = await getCollection(COLLECTION_NAME);

    // Ensure indexes (idempotent operation)
    await collection.createIndex({ stravaId: 1 }, { unique: true });

    return collection as unknown as Collection<AthleteDocument>;
}

/**
 * Find an athlete by their Strava ID
 * @param {number} stravaId 
 * @returns {Promise<AthleteDocument | null>}
 */
export async function findAthleteByStravaId(stravaId: number): Promise<AthleteDocument | null> {
    const collection = await getAthletesCollection();
    return collection.findOne({ stravaId: Number(stravaId) }) as Promise<AthleteDocument | null>;
}

/**
 * Create or update an athlete document
 * @param {number} stravaId 
 * @param {Partial<AthleteDocument>} data 
 * @returns {Promise<AthleteDocument>}
 */
export async function upsertAthlete(stravaId: number, data: Partial<AthleteDocument>): Promise<AthleteDocument | null> {
    const collection = await getAthletesCollection();

    const now = new Date();
    const result = await collection.findOneAndUpdate(
        { stravaId: Number(stravaId) },
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

    return result as unknown as AthleteDocument | null;
}

/**
 * Update athlete tokens
 * @param {number} stravaId 
 * @param {string} accessToken 
 * @param {string} refreshToken 
 * @param {number} expiresAt 
 * @returns {Promise<void>}
 */
export async function updateAthleteTokens(stravaId: number, accessToken: string, refreshToken: string, expiresAt: number): Promise<void> {
    const collection = await getAthletesCollection();

    await collection.updateOne(
        { stravaId: Number(stravaId) },
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
