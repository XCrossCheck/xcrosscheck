import { ICrosscheckSession, ITask } from '../../storage/data/dataTypes';

export interface ICrosscheckSessionList extends ICrosscheckSession {
  task: ITask;
}

export interface IFilters {
  tasks: string[];
  statuses: string[];
}
