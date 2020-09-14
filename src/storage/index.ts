import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import auth from './auth/reducer';
import { IActionResult } from './types';

const reducer = combineReducers({
  auth,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export type TStore = ReturnType<typeof reducer>;

export interface IDispatchAction<T> {
  (payload: T): void;
}
export interface IDispatch {
  (fn: IActionResult<unknown>): void,
}

export default store;
