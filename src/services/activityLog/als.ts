import { injectable, inject } from 'inversify';
import { IActivityLogRepository } from '../../repository/IActivityLogRepository';
import { IActivityLog } from '../../interfaces/IActivityLog';

@injectable()
export class ActivityLogService {
    constructor(@inject('IActivityLogRepository') private activityLogRepository: IActivityLogRepository) {}

    async createActivityLog(logData: IActivityLog): Promise<IActivityLog> {
        try {
            return await this.activityLogRepository.create(logData);
        } catch (error) {
            console.error('Error creating activity log:', error);
            throw new Error('Failed to create activity log');
        }
    }

    async getAllActivityLogs(offset = 0, limit = 100): Promise<IActivityLog[]> {
        try {
            const logs = await this.activityLogRepository.findAll();
            return logs.slice(offset, offset + limit);
        } catch (error) {
            console.error('Error retrieving all activity logs:', error);
            throw new Error('Failed to retrieve activity logs');
        }
    }

    async getActivityLogsBySearch(search: object): Promise<IActivityLog[] | null> {
        try {
            return await this.activityLogRepository.find(search);
        } catch (error) {
            console.error('Error searching activity logs:', error);
            throw new Error('Failed to search activity logs');
        }
    }

    async getActivityLogsByKeyValue(keyValue: string): Promise<IActivityLog[] | null> {
        try {
            return this.activityLogRepository.findByKeyValue(keyValue);
        } catch (error) {
            console.error('Error retrieving activity logs by key value:', error);
            throw new Error('Failed to retrieve activity logs by key value');
        }
    }

    async generateChangeSummaries(logs: IActivityLog[]): Promise<string[]> {
        return logs.map(log => `${log.FieldName} has been changed from ${log.OldValue} to ${log.NewValue}`);
    }

    async deleteAllActivityLogs(): Promise<void> {
        try {
            console.log('Deleting all activity logs...');
            await this.activityLogRepository.deleteAll();
            console.log('All activity logs deleted successfully.');
        } catch (error) {
            console.error('Error deleting all activity logs:', error);
            throw new Error('Failed to delete all activity logs');
        }
    }
}

export default ActivityLogService;
