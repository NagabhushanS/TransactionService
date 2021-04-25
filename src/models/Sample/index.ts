import { Collection, MongoClient } from "mongodb";
import { ExpressRequest, SampleSchema } from "./types";

class Sample {
    private static dbHandle: Collection<SampleSchema>;

    public static injectDB(dbHandle: MongoClient) {
        this.dbHandle = dbHandle.db(process.env.DB_NAME).collection('transactions');
        console.log('Successfully injected db into Transaction Model');
    }

    public static getDB() {
        return this.dbHandle;
    }

}

export default Sample;