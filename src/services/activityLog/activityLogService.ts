import { injectable, inject } from 'inversify';
import { IActivityLogRepository } from '../../repository/IActivityLogRepository'
import { IActivityLog } from  '../../interfaces/IActivityLog';
import { TYPES } from '../../types';

@injectable()
export class ActivityLogService {
    //constructor(@inject('IActivityLogRepository') private activityLogRepository: IActivityLogRepository) {}
    constructor(@inject(TYPES.IActivityLogRepository) private activityLogRepository: IActivityLogRepository) {}

    async createActivityLog(logData: IActivityLog): Promise<IActivityLog> {
        return this.activityLogRepository.create(logData);
    }

    async getAllActivityLogs(offset = 0, limit = 100): Promise<IActivityLog[]> {
        return this.activityLogRepository.findAll();
    }

    async getActivityLogsBySearch(search: object): Promise<IActivityLog[] | null> {
        return this.activityLogRepository.find(search);                  
    }

    async getActivityLogsByKeyValue(keyValue: string): Promise<string[] | null> {
        const results = await this.activityLogRepository.findByKeyValue(keyValue); 

        const output = results ? results.map(log => log.FieldName + ' has been changed from ' + log.OldValue + ' to ' + log.NewValue) : null; 
        return output ? output : null;
       }

    async deleteAllActivityLogs(): Promise<void> {
        return this.activityLogRepository.deleteAll();
    }
}

/* async generateChangeSummaries(logs: IActivityLog[]): Promise<string[]> {
    return logs.map(log => `${log.FieldName} has been changed from ${log.OldValue} to ${log.NewValue}`);
} */

export default ActivityLogService;
