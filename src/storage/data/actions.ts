import { IAction } from '../types';
import constants from './constants';
import { IThunkAction } from '..';
import * as csService from '../../service/crossCheckSession';
import * as taskService from '../../service/task';
import * as stService from '../../service/studentsTasks';
import { ICrosscheckSession, ITask } from './dataTypes';
import * as attService from '../../service/attendees';

type TTasks = {
  get: () => IThunkAction;
  set: IAction<boolean>;
  create: (data: ITask) => IThunkAction;
  update: (data: ITask) => IThunkAction;
  delete: (id: string) => IThunkAction;
  clear: IAction<void>;
};

type TCrosscheckSessions = {
  get: () => IThunkAction;
  set: IAction<boolean>;
  create: (data: ICrosscheckSession) => IThunkAction;
  update: (data: ICrosscheckSession) => IThunkAction;
  delete: (id: string) => IThunkAction;
  clear: IAction<void>;
};

type TAttendees = {
  shuffle: (data: ICrosscheckSession) => IThunkAction;
};

const tasks: TTasks = {
  get: () => async dispatch => {
    const payload = taskService.get();
    dispatch({ type: constants.SET_TASKS, payload: await payload });
  }, create: (data) => async dispatch => {
    const id = await taskService.create(taskService.mapDomainToDb(data));
    if (id) {
      const payload: ITask = {
        ...data,
        id,
      };
      dispatch({ type: constants.CREATE_TASK, payload });
    }
  },
  update: (data) => async dispatch => {
    const result = await taskService.update(taskService.mapDomainToDb(data), data.id);
    if (result) {
      dispatch({ type: constants.UPDATE_TASK, payload: data });
    }
  },
  delete: (id) => async dispatch => {
    const result = await taskService.del(id);
    if (result) {
      dispatch({ type: constants.DELETE_TASK, payload: id });
    }
  },
  set: (payload) => ({ type: constants.SET_TASKS, payload }),
  clear: () => ({ type: constants.CLEAR_TASKS, payload: null }),
};

const crosscheckSessions: TCrosscheckSessions = {
  get: () => async dispatch => {
    const payload = await csService.get();
    const promises = payload
      .filter(e=> e.state === 'REQUESTS_GATHERING' || e.state === 'CROSS_CHECK')
      .map(e => stService.getGithubIdBySessionId(e.id));
    const st = await Promise.all(promises);
    payload.forEach(e => {
      e.submited = st.find(s => s.sessionId === e.id)?.githubIds;
    });
    dispatch({ type: constants.SET_CROSSCHECK_SESSIONS, payload });
  },
  create: (data) => async dispatch => {
    const id = await csService.create(csService.mapDomainToDb(data));
    if (id) {
      const payload: ICrosscheckSession = {
        ...data,
        id,
      };
      dispatch({ type: constants.CREATE_CROSSCHECK_SESSION, payload });
    }
  },
  update: (data) => async dispatch => {
    const result = await csService.update(csService.mapDomainToDb(data), data.id);
    if (result) {
      dispatch({ type: constants.UPDATE_CROSSCHECK_SESSION, payload: data });
    }
  },
  delete: (id) => async dispatch => {
    const result = await csService.del(id);
    if (result) {
      dispatch({ type: constants.DELETE_CROSSCHECK_SESSION, payload: id });
    }
  },
  set: (payload) => ({ type: constants.SET_CROSSCHECK_SESSIONS, payload }),
  clear: () => ({ type: constants.CLEAR_CROSSCHECK_SESSIONS, payload: null }),
};

const attendees: TAttendees = {
  shuffle: (data) => async dispatch => {
    const attendeesResult = attService.shuffleStudents(data);
    const promises = attendeesResult.map(e => attService.create(e));
    await Promise.all(promises);
    dispatch(crosscheckSessions.get());
  },
};

export {
  tasks,
  crosscheckSessions,
  attendees,
};
