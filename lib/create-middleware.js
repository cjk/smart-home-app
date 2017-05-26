// @flow
import type { Middlewares } from '../types';
import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

// Redux logger for Node.js.
// TODO: Pull request for https://github.com/evgenyrodionov/redux-logger.
const nodeLogger = () => next => action => {
  const { type, ...props } = action;
  const propsAsShortString = JSON.stringify(props).slice(0, 60);
  // eslint-disable-next-line
  console.log(`action ${type}, ${propsAsShortString}...`);
  return next(action);
};

const createMiddleware = (platformMiddlewares: Middlewares) => {
  const middleware = [...platformMiddlewares];

  // Logger must be the last middleware in chain.
  if (process.env.NODE_ENV !== 'production') {
    // $FlowFixMe
    const isServer = !process.browser;
    const logger = isServer ? nodeLogger : createLogger({ collapsed: true });
    middleware.push(logger);
  }

  const appliedMiddleware = applyMiddleware(...middleware);

  if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
    return composeWithDevTools(appliedMiddleware);
  }
  return appliedMiddleware;
};

export default createMiddleware;
