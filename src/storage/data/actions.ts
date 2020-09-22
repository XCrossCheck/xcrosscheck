import { IAction } from '../types';
import constants from './constants';
import { IThunkAction } from '..';
import { createSession, deleteSession, getSessions, mapDomainToDb, updateSession } from '../../service/crossCheckSession';
import { getTasks } from '../../service/task';
import { ICrosscheckSession } from './reducer';

type TTasks = {
  get: () => IThunkAction;
  set: IAction<boolean>;
  clear: IAction<void>;
};

type TCrosscheckSessions = {
  get: () => IThunkAction;
  set: IAction<boolean>;
  create: (data: ICrosscheckSession) => IThunkAction;
  update: (data: ICrosscheckSession, key: string) => IThunkAction;
  delete: (id: string) => IThunkAction;
  clear: IAction<void>;
};

const tasks: TTasks = {
  get: () => async dispatch => {
    const payload = getTasks();
    dispatch({ type: constants.SET_TASKS, payload: await payload });
  },
  set: (payload) => ({ type: constants.SET_TASKS, payload }),
  clear: () => ({ type: constants.CLEAR_TASKS, payload: null }),
};

const crosscheckSessions: TCrosscheckSessions = {
  get: () => async dispatch => {
    const payload = await getSessions();
    dispatch({ type: constants.SET_CROSSCHECK_SESSIONS, payload });
  },
  create: (data) => async dispatch => {
    const id = await createSession(mapDomainToDb(data));
    if (id) {
      const payload: ICrosscheckSession = {
        ...data,
        id,
      };
      dispatch({ type: constants.CREATE_CROSSCHECK_SESSION, payload });
    }
  },
  update: (data, key) => async dispatch => {
    const result = await updateSession(mapDomainToDb(data), key);
    if (result) {
      dispatch({ type: constants.UPDATE_CROSSCHECK_SESSION, payload: data });
    }
  },
  delete: (id) => async dispatch => {
    const result = await deleteSession(id);
    if (result) {
      dispatch({ type: constants.DELETE_CROSSCHECK_SESSION, payload: id });
    }
  },
  set: (payload) => ({ type: constants.SET_CROSSCHECK_SESSIONS, payload }),
  clear: () => ({ type: constants.CLEAR_CROSSCHECK_SESSIONS, payload: null }),
};

export {
  tasks,
  crosscheckSessions,
};
