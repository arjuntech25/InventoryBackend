import { injectable } from "inversify";
import { ObjectId } from "mongodb";
import { IActivityLog } from '../interfaces/IActivityLog';
import { IActivityLogRepository } from '../repository/IActivityLogRepository';
import  activityLogCollection from '../models/activityLogCollection';

@injectable()
export class ActivityLogRepository implements IActivityLogRepository {
    constructor() {
        // Constructor implementation
    }

    async create(logData: IActivityLog): Promise<IActivityLog> {
        const collection = await activityLogCollection();
        const result = await collection.insertOne({
            ...logData,
            CreatedOn: new Date(),
            ModifiedOn: new Date()
        });
        return { ...logData };
    }


    async findAll(offset = 0, limit = 100): Promise<IActivityLog[]> {
        const collection = await activityLogCollection();
        const logs = await collection.find().skip(offset).limit(limit).toArray();
    
        return logs.map((log: any): IActivityLog => ({
            Id: log.Id,
            CollectionName: log.CollectionName,
            KeyValue: log.KeyValue,
            FieldName: log.FieldName,
            OldValue: log.OldValue,
            NewValue: log.NewValue,
            CreatedOn: log.CreatedOn,
            CreatedBy: log.CreatedBy,
            ModifiedOn: log.ModifiedOn,
            ModifiedBy: log.ModifiedBy,
        }));
    }




async find(search: any): Promise<IActivityLog[] | null> {
    const collection = await activityLogCollection();
    const results = await collection.find(search).toArray();
    
    if (results.length === 0) {
        return null; 
    }


    return results.map((log: any): IActivityLog => {
        const result: IActivityLog = {
            Id: log.Id,
            CollectionName: log.CollectionName,
            KeyValue: log.KeyValue,
            FieldName: log.FieldName,
            OldValue: log.OldValue,
            NewValue: log.NewValue,
            CreatedOn: log.CreatedOn,
            CreatedBy: log.CreatedBy,
            ModifiedOn: log.ModifiedOn,
            ModifiedBy: log.ModifiedBy
        };


        Object.keys(search).forEach((key) => {
            if (key in result) {
                result[key as keyof IActivityLog] = log[key];
            }
        });
            
        return result;
    });
}

            
    


async findByKeyValue(keyValue: string): Promise<IActivityLog[] | null> {
    const collection = await activityLogCollection();
    const results = await collection.find({ KeyValue: keyValue }).toArray();

    return results.length > 0 ? results.map((log: any): IActivityLog => ({
        Id: log.Id,
        CollectionName: log.CollectionName,
        KeyValue: log.KeyValue,
        FieldName: log.FieldName,
        OldValue: log.OldValue,
        NewValue: log.NewValue,
        CreatedOn: log.CreatedOn,
        CreatedBy: log.CreatedBy,
        ModifiedOn: log.ModifiedOn,
        ModifiedBy: log.ModifiedBy,
    })) : null;
}

async deleteAll(): Promise<void> {
    const collection = await activityLogCollection();
    await collection.deleteMany({});
}
}
export default ActivityLogRepository;

