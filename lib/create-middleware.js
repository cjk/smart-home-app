// @flow
import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import combinedEpics from './combine-epics';
import connectClient from './client';

// Redux logger for Node.js.
// TODO: Pull request for https://github.com/evgenyrodionov/redux-logger.
const nodeLogger = () => next => action => {
  const { type, ...props } = action;
  const propsAsShortString = JSON.stringify(props).slice(0, 60);
  // eslint-disable-next-line
  console.log(`action ${type}, ${propsAsShortString}...`);
  return next(action);
};

const makeEpicsHotReloadable = epicMiddleware => {
  if (!module.hot || typeof module.hot.accept !== 'function') return;
  module.hot.accept('./combine-epics', () => {
    // eslint-disable-next-line global-require
    const combinedEpics = require('./combine-epics').default;
    epicMiddleware.replaceEpic(combinedEpics);
  });
};

const createMiddleware = () => {
  const dependencies = { connectClient };
  const epicMiddleware = createEpicMiddleware(combinedEpics, { dependencies });
  const middleware = [epicMiddleware];

  // Logger must be the last middleware in chain.
  if (process.env.NODE_ENV !== 'production') {
    // $FlowFixMe
    const isServer = !process.browser;
    const logger = isServer ? nodeLogger : createLogger({ collapsed: true });
    middleware.push(logger);
  }

  makeEpicsHotReloadable(epicMiddleware);

  const appliedMiddleware = applyMiddleware(...middleware);

  if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
    return composeWithDevTools(appliedMiddleware);
  }
  return appliedMiddleware;
};

export default createMiddleware;
