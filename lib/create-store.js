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
  initialState: Object = { home: { livestate: { empty: true }, prefs: {} } },
  options?: Options
) => {
  const reducers = createReducer();
  const middleware = createMiddleware();
  return createStore(reducers, initialState, middleware);
};

export default createReduxStore;
