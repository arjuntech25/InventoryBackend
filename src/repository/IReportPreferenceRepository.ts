import { IReportPreference } from "../interfaces/IReportPreference";

export interface IReportPreferenceRepository {

    create(logData: IReportPreference): Promise<IReportPreference>;

    find(UserID: string, SettingName: string): Promise<IReportPreference | null> 
}

