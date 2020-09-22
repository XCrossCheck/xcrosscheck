/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { dbGetReq } from '../../service/restapi-fb';
import { IAction } from '../types';
import constants from './constants';
import { IThunkAction } from '..';
import { ITask, ICrosscheckSession } from './reducer';

type TTasks = {
  get: () => IThunkAction
  set: IAction<boolean>
  clear: IAction<void>
};

type TCrosscheckSessions = {
  get: () => IThunkAction
  set: IAction<boolean>
  clear: IAction<void>
};


const tasks: TTasks = {
  get: () => async dispatch => {
    const response = await dbGetReq('tasks');
    const payload = Object.keys(response.data).map<ITask>(key => ({
      author: response.data[key].author,
      availableToSubmit: response.data[key].availableToSubmit,
      categoriesOrder: response.data[key].categoriesOrder,
      id: response.data[key].id,
      key,
      items: response.data[key].items,
      name: response.data[key].name,
      state: response.data[key].state,
    }));
    dispatch({ type: constants.SET_TASKS, payload });
  },
  set: (payload) => ({ type: constants.SET_TASKS, payload }),
  clear: () => ({ type: constants.CLEAR_TASKS, payload: null }),
};

const crosscheckSessions: TCrosscheckSessions = {
  get: () => async dispatch => {
    const response = await dbGetReq('crossCheckSession');
    const payload = Object.keys(response.data).map<ICrosscheckSession>(key => ({
      attendees: response.data[key].attendees,
      coefficient: response.data[key].coefficient,
      deadlineReview: response.data[key].deadlineReview,
      deadlineSubmit: response.data[key].deadlineSubmit,
      desiredReviewersAmount: response.data[key].desiredReviewersAmount,
      discardMaxScore: response.data[key].discardMaxScore,
      discardMinScore: response.data[key].discardMinScore,
      id: response.data[key].id,
      minReiewsAmount: response.data[key].minReiewsAmount,
      startDate: response.data[key].startDate,
      state: response.data[key].state,
      taskId: response.data[key].taskId,
      key,
    }));
    dispatch({ type: constants.SET_CROSSCHECK_SESSIONS, payload });
  },
  set: (payload) => ({ type: constants.SET_CROSSCHECK_SESSIONS, payload }),
  clear: () => ({ type: constants.CLEAR_CROSSCHECK_SESSIONS, payload: null }),
};

export {
  tasks,
  crosscheckSessions,
};
