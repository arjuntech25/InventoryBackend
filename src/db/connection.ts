import { MongoClient, Db } from "mongodb";

let db: Db;
const connectDB = async (uri: string, dbName: string) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        db = client.db(dbName);

        console.log('Connected to MongoDB');
    } catch (err) {
        if (err instanceof Error ) {
            console.error (err.message);
        } else  {
            console.error ('An Unknown Error occured');
        }
        process.exit(1);
        }
    };

    const getDB = (): Db => {
        if (!db) {
            throw new Error('Database Not Initialized. Call connectDB first');
        }
        return db;
    };
    
    export { connectDB, getDB }