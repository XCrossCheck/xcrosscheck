/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Callback from '../Callback';
import './app.css';

<<<<<<< HEAD

const App = (props:any) => {
  console.log('app:',props);
  const [logged, setLogged] = useState(true);
=======
const Test = () => <div>This is a TEST</div>;

const App = (props: any) => {
  console.log('app:', props);

  const [logged, setLogged] = useState(false);
>>>>>>> develop
  const [role, setRole] = useState('student');

  console.log(logged);

  return (
    <Switch>
<<<<<<< HEAD
=======
      <Route path="/test" component={Test} />

      <Route
        path="/meho"
        render={(props) => <Home logged setLogged={setLogged} setRole={setRole} props={props} />}
      />
>>>>>>> develop
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
<<<<<<< HEAD
          <Home
            logged={logged}
//            setLogged={setLogged}
//            setRole={setRole}
//            props={props}
          />
=======
          <Home logged={logged} setLogged={setLogged} setRole={setRole} props={props} />
>>>>>>> develop
        )}
      />
    </Switch>
  );
};

export default App;
