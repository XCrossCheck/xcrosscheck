import { combineReducers } from 'redux';
import { IReducer } from '../types';
import constants from './constants';

export interface IAttendee {
  githubId: string;
  reviewerOf: string[];
}

export interface ICrosscheckSession {
  attendees: IAttendee[];
  coefficient: number;
  deadlineReview: string;
  deadlineSubmit: string;
  desiredReviewersAmount: number;
  discardMaxScore: boolean;
  discardMinScore: boolean;
  id: string;
  key: string;
  minReiewsAmount: number;
  startDate: string;
  state: string;
  taskId: string;
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

const crosscheckSessions: IReducer<ICrosscheckSession[]> = (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.SET_CROSSCHECK_SESSIONS:
      return payload;
    case constants.CLEAR_CROSSCHECK_SESSIONS:
      return null;
    default:
      return state;
  }
};

const reducer = combineReducers({
  tasks,
  crosscheckSessions,
});

export default reducer;
