// @flow
import type { Middlewares, Reducers } from '../types';
import { reducer } from '../lib/app/reducers';
import createMiddleware from './create-middleware';
import createReducer from './create-reducers';
import { createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

// Exact object type prevents typos.
// https://flow.org/en/docs/types/objects/#toc-exact-object-types
type Options = {|
  platformReducers?: Reducers,
  platformMiddlewares?: Middlewares,
|};

const createReduxStore = (
  initialState: Object = { status: 'idle' },
  options?: Options
) => {
  const {
    platformMiddlewares = [thunkMiddleware],
    platformReducers = {},
  } = options || {};
  const reducers = reducer; // createReducer(platformReducers);
  const middleware = createMiddleware(platformMiddlewares);
  return createStore(reducers, initialState, middleware);
};

export default createReduxStore;
