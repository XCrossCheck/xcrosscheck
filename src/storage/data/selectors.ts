import { TStore } from '..';
import { ITask, ICrosscheckSession } from './dataTypes';

export const tasks = (state: TStore) : ITask[] | null => state.data.tasks;
export const croscheckSessions = (state: TStore): ICrosscheckSession[] | null => state.data.crosscheckSessions;