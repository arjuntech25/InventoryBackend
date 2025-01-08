import { Container } from 'inversify';
import { TYPES } from './types';
import { ActivityLogController } from './controllers/activityLog/activityLogController';
import { ActivityLogService } from './services/activityLog/activityLogService';
import { ActivityLogRepository } from './repository/activityLogRepository';
import { IActivityLogRepository } from './repository/IActivityLogRepository';

// Bind Identifiers (could also use a separate identifiers file if needed)
// const TYPES = {
//     IActivityLogRepository: Symbol.for('IActivityLogRepository'),
//     ActivityLogService: Symbol.for('ActivityLogService'),
//     ActivityLogController: Symbol.for('ActivityLogController'),
// };

// Create a new Inversify container
const container = new Container();

// Bind interfaces and implementations
container.bind<IActivityLogRepository>(TYPES.IActivityLogRepository).to(ActivityLogRepository);
//container.bind<ActivityLogRepository>(TYPES.ActivityLogRepository).to(ActivityLogRepository);
container.bind<ActivityLogService>(TYPES.ActivityLogService).to(ActivityLogService);
container.bind<ActivityLogController>(TYPES.ActivityLogController).to(ActivityLogController);
//console.log(container.getBindings());

export { container, TYPES };
