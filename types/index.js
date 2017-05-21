// @flow
import type {
  Middleware as ReduxMiddleware,
  Reducer as ReduxReducer,
  Store as ReduxStore,
} from 'redux';

export type Action =
  // | { type: 'RESET_FIELDS', +payload: {| +id: string |} }
  | { type: 'SET_APP_ONLINE', +payload: {| +online: boolean |} }
  | {
      type: 'SET_FIELD',
      +payload: {| +id: string, +name: any, +value: any |},
    }
  | { type: 'TOGGLE_BASELINE' }
  | { type: 'TOGGLE_DARK' };

export type Reducers = { +[reducerName: string]: ReduxReducer<State, Action> };

export type Middlewares = Array<ReduxMiddleware<State, Action>>;

export type Store = ReduxStore<State, Action>;

export type FunctionalComponent<P> = (props: P) => ?React$Element<any>;
