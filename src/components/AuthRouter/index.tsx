import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Home from '../Home';
import Callback from '../Callback';
import Loading from '../_Common/loading';
import GitLogin from '../GitLogin';
import { TStore, IDispatch, IDispatchAction } from '../../storage';
import * as authSelectors from '../../storage/auth/selectors';
import * as authAct from '../../storage/auth/actions';

const AuthRouter: FC = () => {
  const dispatch: IDispatch = useDispatch();
  const logged = useSelector<TStore, boolean | null>((state) => authSelectors.logged(state));
  const userRole = useSelector<TStore, string | null>((state) => authSelectors.userRole(state));
  const setLogged: IDispatchAction<boolean> = (payload) => dispatch(authAct.logged.set(payload));
  const setUserRole: IDispatchAction<string> = (payload) => dispatch(authAct.userRole.set(payload));

  if (logged === false && !userRole) {
    return (
      <Switch>
        <Route
          path="/callback"
          render={(props) => (
            <Callback props={props} />
          )}
        />
        <Route
          path="/"
          render={() => (
            <GitLogin setLogged={setLogged} setRole={setUserRole} />
          )}
        />
      </Switch>
    );
  } if (logged && userRole) {
    return <Home userRole={userRole} />;
  }
  return <Loading />;
};

export default AuthRouter;
