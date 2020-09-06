import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Callback from '../Callback';
import './app.css';

const Test = () => (<div>This is a TEST</div>);

const App = (props:any) => {
  console.log('app:',props);
  const [logged, setLogged] = useState(false);
  const [role, setRole] = useState('student');

  console.log(logged);

  return (
    <Switch>
      <Route path="/test" component={Test} />

      <Route
        path="/meho"
        render={(props) => (
          <Home
            logged={true}
            setLogged={setLogged}
            setRole={setRole}
            props={props}
          />
        )}
      />

      <Route
        path="/callback"
        render={(props) => (
          <Callback
            // logged={logged}
            // setLogged={setLogged}
            // setRole={setRole}
            props={props}
          />
        )}
      />
      <Route
        // exact
        path="/"
        render={(props) => (
          <Home
            logged={logged}
            setLogged={setLogged}
            setRole={setRole}
            props={props}
          />
        )}
      />
    </Switch>
  );
};

export default App;
