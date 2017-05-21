// @flow
import type { Middlewares, Reducers } from '../types';
import createMiddleware from './create-middleware';
import createReducer from './create-reducers';
import { createStore } from 'redux';

// Exact object type prevents typos.
// https://flow.org/en/docs/types/objects/#toc-exact-object-types
type Options = {|
                platformReducers?: Reducers,
                platformMiddlewares?: Middlewares,
               |};

const createReduxStore = (initialState: Object = {}, options?: Options) => {
  const { platformMiddlewares = [], platformReducers = {} } = options || {};
  const reducers = createReducer(platformReducers);
  const middleware = createMiddleware(platformMiddlewares);
  return createStore(reducers, initialState, middleware);
};

export default createReduxStore;
