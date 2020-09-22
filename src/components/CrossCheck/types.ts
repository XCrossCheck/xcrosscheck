import { ICrosscheckSession, ITask } from '../../storage/data/reducer';

export interface ICrosscheckSessionList extends ICrosscheckSession {
  task: ITask;
}