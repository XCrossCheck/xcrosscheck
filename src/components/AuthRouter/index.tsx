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
  const githubId = useSelector<TStore, string | null>((state) => authSelectors.githubId(state));
  const setLogged: IDispatchAction<boolean> = (payload) => dispatch(authAct.logged.set(payload));
  const setUserRole: IDispatchAction<string> = (payload) => dispatch(authAct.userRole.set(payload));
  const setGithubId: IDispatchAction<string> = (payload) => dispatch(authAct.githubId.set(payload));

  const login = getCookie('login');
  const ur = getCookie('userRole');

  const logOut = () => {
    delCookie('login');
    delCookie('userRole');
    setLogged(false);
    setUserRole('');
    setGithubId('');
    return <Redirect to="/" />;
  };
  
  if (ur) setUserRole(ur);
  else if (userRole) setCookie('userRole', userRole);
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
            <Callback props={props} setLogged={setLogged} setGithubId={setGithubId}/>
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
