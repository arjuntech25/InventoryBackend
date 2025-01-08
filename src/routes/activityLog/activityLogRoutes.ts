import express from 'express';
import { container } from '../../inversify.config';
import { TYPES } from '../../types'; 
import ActivityLogController from '../../controllers/activityLog/activityLogController';

const activityLogRoutes = express.Router();


// Resolve the ActivityLogController from the container
//const activityLogController = container.resolve(ActivityLogController);
const activityLogController = container.get<ActivityLogController>(TYPES.ActivityLogController);



/**
 * @swagger
 * /activity-logs:
 *   post:
 *     summary: Create a new activity log
 *     description: Creates a new activity log entry with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id:
 *                 type: string
 *               CollectionName:
 *                 type: string
 *               KeyValue:
 *                 type: string
 *               FieldName:
 *                 type: string
 *               OldValue:
 *                 type: string
 *               NewValue:
 *                 type: string
 *               CreatedOn:
 *                 type: string
 *                 format: date-time
 *               CreatedBy:
 *                 type: string
 *               ModifiedOn:
 *                 type: string
 *                 format: date-time
 *               ModifiedBy:
 *                 type: string
 *     responses:
 *       201:
 *         description: Activity log created successfully.
 *       400:
 *         description: Invalid input.
 */
activityLogRoutes.post('/', (req, res, next) =>
  activityLogController.createActivityLog(req, res).catch(next)
);

/**
 * @swagger
 * /activity-logs:
 *   get:
 *     summary: Retrieve all activity logs
 *     description: Fetches all activity logs stored in the system.
 *     responses:
 *       200:
 *         description: A list of all activity logs.
 *       500:
 *         description: Internal server error.
 */
activityLogRoutes.get('/', (req, res, next) =>
  activityLogController.getAllActivityLogs(req, res).catch(next)
);

/**
 * @swagger
 * /activity-logs/search:
 *   post:
 *     summary: Search activity logs
 *     description: Search for activity logs based on specific criteria such as CollectionName or CreatedBy.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CollectionName:
 *                 type: string
 *               FieldName:
 *                 type: string
 *               CreatedBy:
 *                 type: string
 *               ModifiedBy:
 *                 type: string
 *               CreatedOn:
 *                 type: string
 *                 format: date-time
 *               ModifiedOn:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: A list of matching activity logs.
 *       400:
 *         description: Invalid search criteria.
 */
activityLogRoutes.post('/search', (req, res, next) =>
  activityLogController.getActivityLogsBySearch(req, res).catch(next)
);

/**
 * @swagger
 * /activity-logs/{keyValue}:
 *   get:
 *     summary: Retrieve activity logs by key value
 *     description: Fetches activity logs associated with a specific key value.
 *     parameters:
 *       - in: path
 *         name: keyValue
 *         required: true
 *         schema:
 *           type: string
 *         description: The key value used to filter activity logs.
 *     responses:
 *       200:
 *         description: A list of activity logs for the specified key value.
 *       404:
 *         description: No logs found for the given key value.
 */
activityLogRoutes.get('/:keyValue', (req, res, next) =>
  activityLogController.getActivityLogsByKeyValue(req, res).catch(next)
);

/**
 * @swagger
 * /activity-logs:
 *   delete:
 *     summary: Delete all activity logs
 *     description: Removes all activity logs from the system.
 *     responses:
 *       200:
 *         description: All activity logs deleted successfully.
 *       500:
 *         description: Internal server error.
 */
activityLogRoutes.delete('/', (req, res, next) =>
  activityLogController.deleteAllActivityLogs(req, res).catch(next)
);

export default activityLogRoutes;
