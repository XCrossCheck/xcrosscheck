import { IAction } from '../types';
import constants from './constants';

type TLogged = {
  set: IAction<boolean>
};

type TUserRole = {
  set: IAction<string>
  clear: IAction<void>
};

const logged: TLogged = {
  set: (payload) => ({ type: constants.SET_LOGGED, payload }),
};

const userRole: TUserRole = {
  set: (payload) => ({ type: constants.SET_USER_ROLE, payload }),
  clear: () => ({ type: constants.CLEAR_USER_ROLE, payload: null }),
};

export {
  logged,
  userRole,
};
