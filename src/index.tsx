/* eslint-disable linebreak-style */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import App from './components/App';
import AddTask from './components/AddTask/index';

ReactDOM.render(
  <Router>
    <AddTask />
  </Router>,
  document.getElementById('root'),
);
