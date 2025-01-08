import { injectable } from 'inversify';
import { IReportPreference } from '../interfaces/IReportPreference';
import { IReportPreferenceRepository } from './IReportPreferenceRepository';
import reportPreferenceCollection from '../models/reportPreferenceCollection';

@injectable()
class reportPreferenceRepository implements IReportPreferenceRepository {
    constructor() {
        // constructor implementation
    }

async create(preferenceData: IReportPreference): Promise<IReportPreference> {
    const collection = await reportPreferenceCollection();
    const result = await collection.insertOne({
    ...preferenceData, CreatedOn: new Date(), ModifiedOn: new Date()
    });
    return {...preferenceData};
}
async find(UserID: string, SettingName: string): Promise<IReportPreference | null> {
    const collection = await reportPreferenceCollection();
    const results = await collection.find({UserId: UserID, SettingName: SettingName }).toArray();

    return results.length > 0 ? {
        Id: results[0].Id,  
        UserId: results[0].UserId,
        SettingName: results[0].SettingName,
        SettingValue: results[0].SettingValue,
        Module: results[0].Module,
        CreatedOn: results[0].CreatedOn,
        ModifiedOn: results[0].ModifiedOn,
        CreatedBy: results[0].CreatedBy,
        ModifiedBy: results[0].ModifiedBy,
    } : null;

}
}

export default reportPreferenceRepository;