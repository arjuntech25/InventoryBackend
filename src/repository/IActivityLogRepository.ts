import { IActivityLog } from '../interfaces/IActivityLog';

export interface IActivityLogRepository {

    create(logData: IActivityLog): Promise<IActivityLog>;

    find(search: any): Promise<IActivityLog[] | null>;

    findAll(): Promise<IActivityLog[]>;

    findByKeyValue(keyValue: string): Promise<IActivityLog[] | null>;    

    deleteAll(): Promise<void>;
}
