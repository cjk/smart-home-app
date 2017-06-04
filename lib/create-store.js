// @flow
import type { Middleware, Reducers } from '../types';
import createMiddleware from './create-middleware';
import createReducer from './create-reducers';
import { createStore } from 'redux';

// Exact object type prevents typos.
// https://flow.org/en/docs/types/objects/#toc-exact-object-types
type Options = {|
  platformReducers?: Reducers,
  platformMiddlewares?: Middleware,
|};

const createReduxStore = (
  // Global initial state; leaving keys out takes the initial state from their corresponding reducers instead (like
  // 'home', 'fermenter', ...)
  initialState: Object = { app: {} },
  options?: Options
) => {
  const reducers = createReducer();
  const middleware = createMiddleware();
  return createStore(reducers, initialState, middleware);
};

export default createReduxStore;
