import { IAction } from '../types';
import constants from './constants';

type TLogged = {
  set: IAction<boolean>;
};

type TUserRole = {
  set: IAction<string>;
  clear: IAction<void>;
};

type TGithubId = {
  set: IAction<string>;
  clear: IAction<void>;
};

type TToken = {
  set: IAction<string>;
  clear: IAction<void>;
};

const logged: TLogged = {
  set: payload => ({ type: constants.SET_LOGGED, payload }),
};

const userRole: TUserRole = {
  set: payload => ({ type: constants.SET_USER_ROLE, payload }),
  clear: () => ({ type: constants.CLEAR_USER_ROLE, payload: null }),
};

const githubId: TGithubId = {
  set: payload => ({ type: constants.SET_GITHUBID, payload }),
  clear: () => ({ type: constants.CLEAR_GITHUBID, payload: null }),
};

const token: TToken = {
  set: payload => ({ type: constants.SET_TOKEN, payload }),
  clear: () => ({ type: constants.CLEAR_TOKEN, payload: null }),
};

export { logged, userRole, githubId, token };
