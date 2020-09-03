import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Callback from '../Callback';
import './app.css';

const App = () => {
  const [logged, setLogged] = useState(false);
  const [role, setRole] = useState('student');

console.log(logged);

  return (
    <Switch>
      <Route path="/callback" component={Callback}/>
      <Route
        exact
        path="/"
        render={(props) => (
        <Home logged={logged} setLogged={setLogged} setRole={setRole} />)} 
      />
    </Switch>
  );
};






export default App;
