import { combineReducers } from 'redux';
import { IReducer } from '../types';
import constants from './constants';

const logged: IReducer<boolean | null> = (state = true, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.SET_LOGGED:
      return payload;
    default:
      return state;
  }
};

const userRole: IReducer<string | null> = (state = 'student', action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.SET_USER_ROLE:
      return payload;
    case constants.CLEAR_USER_ROLE:
      return null;
    default:
      return state;
  }
};

const reducer = combineReducers({
  logged,
  userRole,
});

export default reducer;
