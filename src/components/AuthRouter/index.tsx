/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/prefer-regexp-exec */
import React, { FC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Home from '../Home';
import Callback from '../Callback';
import Loading from '../_Common/loading';
import GitLogin from '../GitLogin';
import { TStore, IDispatch, IDispatchAction } from '../../storage';
import * as authSelectors from '../../storage/auth/selectors';
import * as authAct from '../../storage/auth/actions';
import { setCookie, getCookie, delCookie } from '../../service/cookies';

const AuthRouter: FC = () => {
  const dispatch: IDispatch = useDispatch();
  const logged = useSelector<TStore, boolean | null>((state) => authSelectors.logged(state));
  const userRole = useSelector<TStore, string | null>((state) => authSelectors.userRole(state));
  const setLogged: IDispatchAction<boolean> = (payload) => dispatch(authAct.logged.set(payload));
  const setUserRole: IDispatchAction<string> = (payload) => dispatch(authAct.userRole.set(payload));
  const setGithubId: IDispatchAction<string> = (payload) => dispatch(authAct.githubId.set(payload));
  const setToken: IDispatchAction<string> = (payload) => dispatch(authAct.token.set(payload));

  const login = getCookie('login');

  const logOut = () => {
    delCookie('login');
    delCookie('userRole');
    setLogged(false);
    setUserRole('');
    setGithubId('');
    setToken('');
    console.log('logOut');
    return <Redirect to="/" />;
  };


  if ( login) {
    setLogged( true);
    setGithubId( login);
  }

  if ( !logged ) {
    return (
      <Switch>
        <Route
          path="/callback"
          render={(props) => (
            <Callback props={props} setLogged={setLogged} setGithubId={setGithubId} setToken={setToken}/>
          )}
        />
        <Route
          path="/"
          render={() => (
            <GitLogin setRole={setUserRole} />
          )}
        />
      </Switch>
    );
  } if (logged && userRole) {

    return <Home userRole={userRole} githubId={githubId} logOut={logOut}/>;
  }
  return <Loading />;
};

export default AuthRouter;
