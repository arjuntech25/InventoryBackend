import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import  ActivityLogService  from '../../services/activityLog/activityLogService';
import { IActivityLog } from '../../interfaces/IActivityLog';
import { TYPES } from '../../types';

@injectable()
export class ActivityLogController {
    //constructor(@inject('ActivityLogService') private activityLogService: ActivityLogService) {}
    constructor(@inject(TYPES.ActivityLogService) private activityLogService: ActivityLogService) {}


    async createActivityLog(req: Request, res: Response): Promise<void> {
        try {
            const logData: IActivityLog = req.body;
            const newLog = await this.activityLogService.createActivityLog(logData);
            res.status(201).json(newLog);
        } catch (error) {
            console.error('Error creating activity log:', error);
            res.status(500).json({ message: 'Failed to create activity log' });
        }
    }


    async getAllActivityLogs(req: Request, res: Response): Promise<void> {
        try {
            const offset = parseInt(req.query.offset as string) || 0;
            const limit = parseInt(req.query.limit as string) || 100;

            const logs = await this.activityLogService.getAllActivityLogs(offset, limit);
            res.status(200).json(logs);
        } catch (error) {
            console.error('Error retrieving activity logs:', error);
            res.status(500).json({ message: 'Failed to retrieve activity logs' });
        }
    }


    async getActivityLogsBySearch(req: Request, res: Response): Promise<void> {
        try {
            const searchCriteria = req.body;

            const logs = await this.activityLogService.getActivityLogsBySearch(searchCriteria);
            if (logs) {
                res.status(200).json(logs);
            } else {
                res.status(404).json({ message: 'No activity logs found matching the search criteria' });
            }
        } catch (error) {
            console.error('Error searching activity logs:', error);
            res.status(500).json({ message: 'Failed to search activity logs' });
        }
    }


    async getActivityLogsByKeyValue(req: Request, res: Response): Promise<void> {
        try {
            const { keyValue } = req.params;

            const logs = await this.activityLogService.getActivityLogsByKeyValue(keyValue);
            if (logs) {
                res.status(200).json(logs);
            } else {
                res.status(404).json({ message: 'No activity logs found for the specified key value' });
            }
        } catch (error) {
            console.error('Error retrieving activity logs by key value:', error);
            res.status(500).json({ message: 'Failed to retrieve activity logs by key value' });
        }
    }

    async deleteAllActivityLogs(req: Request, res: Response): Promise<void> {
        try {
            await this.activityLogService.deleteAllActivityLogs();
            res.status(200).json({ message: 'All activity logs deleted successfully' });
        } catch (error) {
            console.error('Error deleting all activity logs:', error);
            res.status(500).json({ message: 'Failed to delete all activity logs' });
        }
    }
}

export default ActivityLogController;
