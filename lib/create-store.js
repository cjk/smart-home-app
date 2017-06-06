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

const makeReducersHotReloadable = store => {
  if (!module.hot || typeof module.hot.accept !== 'function') return;
  module.hot.accept('./create-reducers', () => {
    //     eslint-disable-next-line global-require
    const createNextReducer = require('./create-reducers').default;
    store.replaceReducer(createNextReducer());
  });
};

const createReduxStore = (
  // Global initial state; leaving keys out takes the initial state from their corresponding reducers instead (like
  // 'home', 'fermenter', ...)
  initialState: Object = { app: {} },
  options?: Options
) => {
  const reducers = createReducer();
  const middleware = createMiddleware();
  const store = createStore(reducers, initialState, middleware);

  makeReducersHotReloadable(store);
  return store;
};

export default createReduxStore;
