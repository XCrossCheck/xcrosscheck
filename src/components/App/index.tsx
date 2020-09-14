import React, { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AuthRouter from "../AuthRouter";
import store from "../../storage";
import "./app.css";

const App: FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AuthRouter />
    </BrowserRouter>
  </Provider>
);

export default App;
