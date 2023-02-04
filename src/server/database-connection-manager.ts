import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

export default class DatabaseConnectionManager {
    private static instance: DatabaseConnectionManager;
    private mongoUri: string;

    private constructor(mongoUri: string = process.env.CONNECTION as string) {
        this.mongoUri = mongoUri;
        mongoose.connect(this.mongoUri);
    }

    public static getInstance(): DatabaseConnectionManager {
        if (!DatabaseConnectionManager.instance) {
            DatabaseConnectionManager.instance = new DatabaseConnectionManager();
        }
        return DatabaseConnectionManager.instance;
    }

    public createDatabaseConnection(): mongoose.Connection {
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        return db;
    }
}