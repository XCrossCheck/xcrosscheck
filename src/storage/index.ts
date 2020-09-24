import { combineReducers, createStore, applyMiddleware, Action } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction } from 'redux-thunk';
import auth from './auth/reducer';
import data from './data/reducer';
import { IActionResult } from './types';




const reducer = combineReducers({
  auth,
  data,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export type TStore = ReturnType<typeof reducer>;

export interface IDispatchAction<T = void> {
  (payload: T): void;
}
export interface IDispatch {
  (fn: IActionResult<unknown>): void,
}

export interface IDispatchThunk<T = void> {
  (fn: IThunkAction<T>): void,
}

export type IThunkAction<ReturnType = void> = ThunkAction<
ReturnType,
TStore,
unknown,
Action<string>
>;

export default store;
