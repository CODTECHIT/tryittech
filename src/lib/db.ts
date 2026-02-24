import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

// Global cache to avoid reconnecting on every hot reload in dev
const globalWithMongoose = global as typeof globalThis & {
    mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    if (globalWithMongoose.mongoose.conn) {
        return globalWithMongoose.mongoose.conn;
    }

    if (!globalWithMongoose.mongoose.promise) {
        globalWithMongoose.mongoose.promise = mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,  // fail fast in 5s
            socketTimeoutMS: 10000,
        });
    }

    try {
        globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
    } catch (err) {
        globalWithMongoose.mongoose.promise = null;
        throw err;
    }

    return globalWithMongoose.mongoose.conn;
}

export default connectDB;
