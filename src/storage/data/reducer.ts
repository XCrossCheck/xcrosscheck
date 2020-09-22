import { combineReducers } from 'redux';
import { IReducer, IReducerP } from '../types';
import constants from './constants';

export interface IAttendee {
  githubId: string;
  reviewerOf: string[];
}
export interface ICrosscheckSessionDb {
  attendees: IAttendee[];
  coefficient: number;
  deadlineReview: Date;
  deadlineSubmit: Date;
  desiredReviewersAmount: number;
  discardMaxScore: boolean;
  discardMinScore: boolean;
  minReiewsAmount: number;
  startDate: Date;
  state: string;
  taskId: string;
}

export interface ICrosscheckSession extends ICrosscheckSessionDb {
  id: string;
}

export interface Item {
  category: string;
  description: string;
  id: string;
  maxScore: number;
  minScore: number;
  title: string;
}

export interface ITask {
  author: string;
  availableToSubmit: boolean;
  categoriesOrder: string[];
  id: string;
  key: string;
  items: Item[];
  name: string;
  state: string;
}

const tasks: IReducer<ITask[]> = (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.SET_TASKS:
      return payload;
    case constants.CLEAR_TASKS:
      return null;
    default:
      return state;
  }
};

const crosscheckSessions: IReducerP<ICrosscheckSession[], ICrosscheckSession[] | ICrosscheckSession | string> = (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.SET_CROSSCHECK_SESSIONS:
      return payload as ICrosscheckSession[];
    case constants.CLEAR_CROSSCHECK_SESSIONS:
      return null;
    case constants.CREATE_CROSSCHECK_SESSION:
      return [...state, payload as ICrosscheckSession];
    case constants.UPDATE_CROSSCHECK_SESSION:
      return [...state.filter(e => e.id !== (payload as ICrosscheckSession).id), payload as ICrosscheckSession];
    case constants.DELETE_CROSSCHECK_SESSION:
      return state.filter(e => e.id !== payload as string);
    default:
      return state;
  }
};

const reducer = combineReducers({
  tasks,
  crosscheckSessions,
});

export default reducer;
