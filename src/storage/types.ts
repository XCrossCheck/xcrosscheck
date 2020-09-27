export interface IAction<T> {
  (payload: T): IActionResult<T>;
}

export type IActionResult<T> = {
  type: string;
  payload: T;
};

export interface IReducer<T> {
  (state: T, payload: IActionResult<T>): T;
}

export interface IReducerP<T, P> {
  (state: T, payload: IActionResult<P>): T;
}
