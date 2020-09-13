/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, FC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../Home';
import Callback from '../Callback';
import Loading from '../_Common/loading';
import GitLogin from '../GitLogin';

const AuthRouter: FC = () => {
  const [logged, setLogged] = useState<boolean | null>(true);
  const [role, setRole] = useState<string | null>('student');

  console.log(logged);

  if (logged === false && !role) {
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
            <GitLogin setLogged={setLogged} setRole={setRole} />
          )}
        />
      </Switch>
    );
  } if (logged && role) {
    return <Home />;
  }
  return <Loading />;
};

export default AuthRouter;
