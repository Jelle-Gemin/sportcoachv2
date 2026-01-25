import { MongoClient } from 'mongodb';

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

/**
 * Get the MongoDB client promise (lazy initialization)
 * @returns {Promise<MongoClient>}
 */
function getClientPromise() {
    if (!process.env.MONGODB_URI) {
        throw new Error('Please add your MongoDB URI to .env.local');
    }

    if (clientPromise) {
        return clientPromise;
    }

    const uri = process.env.MONGODB_URI;

    if (process.env.NODE_ENV === 'development') {
        // In development, use a global variable to preserve the client across hot-reloads
        if (!global._mongoClientPromise) {
            client = new MongoClient(uri, options);
            global._mongoClientPromise = client.connect();
        }
        clientPromise = global._mongoClientPromise;
    } else {
        // In production, create a new client for each serverless function invocation
        client = new MongoClient(uri, options);
        clientPromise = client.connect();
    }

    return clientPromise;
}

/**
 * Get the MongoDB database instance
 * @returns {Promise<import('mongodb').Db>}
 */
export async function getDb() {
    const client = await getClientPromise();
    return client.db();
}

/**
 * Get a specific collection from the database
 * @param {string} collectionName 
 * @returns {Promise<import('mongodb').Collection>}
 */
export async function getCollection(collectionName: string) {
    const db = await getDb();
    return db.collection(collectionName);
}

export default getClientPromise;
