type TAuthConstants = {
  SET_LOGGED: string;
  SET_USER_ROLE: string;
  CLEAR_USER_ROLE: string;
  SET_GITHUBID: string;
  CLEAR_GITHUBID: string;
  SET_TOKEN: string;
  CLEAR_TOKEN: string;
};

const constants: TAuthConstants = {
  SET_LOGGED: 'SET_LOGGED',
  SET_USER_ROLE: 'SET_USER_ROLE',
  CLEAR_USER_ROLE: 'CLEAR_USER_ROLE',
  SET_GITHUBID: 'SET_GITHUBID',
  CLEAR_GITHUBID: 'CLEAR_GITHUBID',
  SET_TOKEN: 'SET_TOKEN',
  CLEAR_TOKEN: 'CLEAR_TOKEN',
};

export default constants;
