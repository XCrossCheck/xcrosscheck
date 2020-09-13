import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthRouter from '../AuthRouter';
import './app.css';

const App: FC = () => (
  <BrowserRouter>
    <AuthRouter />
  </BrowserRouter>
);

export default App;
