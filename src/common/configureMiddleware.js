/* @flow weak */
import configureDeps from './configureDeps';
import configureEpics from './configureEpics';
import { createLogger } from 'redux-logger';
import isClient from './app/isClient';
import { createEpicMiddleware } from 'redux-observable';

// Like redux-thunk, but with just one argument for dependencies.
const injectMiddleware = deps => ({ dispatch, getState }: any) => (
  next: any
) => (action: any) =>
  next(
    typeof action === 'function'
      ? action({ ...deps, dispatch, getState })
      : action
  );

const configureMiddleware = (
  initialState: any,
  platformDeps: any,
  platformMiddleware: any
) => {
  const deps = configureDeps(initialState, platformDeps);
  const rootEpic = configureEpics(deps);
  const epicMiddleware = createEpicMiddleware(rootEpic);

  const middleware = [
    injectMiddleware(deps),
    epicMiddleware,
    ...platformMiddleware,
  ];

  const enableLogger = process.env.NODE_ENV !== 'production' && isClient;

  // Logger must be the last middleware in chain.
  if (enableLogger) {
    const logger = createLogger({
      collapsed: true,
    });
    middleware.push(logger);
  }

  if (module.hot && typeof module.hot.accept === 'function') {
    module.hot.accept('./configureEpics', () => {
      const configureEpics = require('./configureEpics').default;

      epicMiddleware.replaceEpic(configureEpics(deps));
    });
  }

  return middleware;
};

export default configureMiddleware;
