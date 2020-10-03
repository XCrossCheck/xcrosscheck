import { combineReducers } from 'redux';
import { IReducerP } from '../types';
import constants from './constants';
import { ICrosscheckSession, ITask } from './dataTypes';

const tasks: IReducerP<ITask[], ITask[] | ITask | string> = (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.SET_TASKS:
      return payload as ITask[];
    case constants.CLEAR_TASKS:
      return null;
    case constants.CREATE_TASK:
      return [...state, payload as ITask];
    case constants.UPDATE_TASK:
      return [...state.filter(e => e.id !== (payload as ITask).id), payload as ITask];
    case constants.DELETE_TASK:
      return state.filter(e => e.id !== (payload as string));
    default:
      return state;
  }
};

const crosscheckSessions: IReducerP<
ICrosscheckSession[],
ICrosscheckSession[] | ICrosscheckSession | string
> = (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.SET_CROSSCHECK_SESSIONS:
      return payload as ICrosscheckSession[];
    case constants.CLEAR_CROSSCHECK_SESSIONS:
      return null;
    case constants.CREATE_CROSSCHECK_SESSION:
      return [...state, payload as ICrosscheckSession];
    case constants.UPDATE_CROSSCHECK_SESSION:
      return [
        ...state.filter(e => e.id !== (payload as ICrosscheckSession).id),
        payload as ICrosscheckSession,
      ];
    case constants.DELETE_CROSSCHECK_SESSION:
      return state.filter(e => e.id !== (payload as string));
    default:
      return state;
  }
};

const reducer = combineReducers({
  tasks,
  crosscheckSessions,
});

export default reducer;
