import Firebase from 'firebase';
import configureReducer from './configureReducer';
import createLogger from 'redux-logger';
import isomorphicFetch from 'isomorphic-fetch';
import promiseMiddleware from 'redux-promise-middleware';
import shortid from 'shortid';
import storageDebounce from 'redux-storage-decorator-debounce';
import storageFilter from 'redux-storage-decorator-filter';
import validate from './validate';
import { SET_CURRENT_LOCALE } from './intl/actions';
import { applyMiddleware, createStore } from 'redux';
import { createMiddleware as createStorageMiddleware } from 'redux-storage';
import smartHomeConnect from './home/connector';

const isReactNative =
  typeof navigator === 'object' &&
  navigator.product === 'ReactNative';

const enableLogger =
  process.env.NODE_ENV !== 'production' &&
  process.env.IS_BROWSER || isReactNative;

// Like redux-thunk with dependency injection.
const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action
  );

// configureStore is blog.ploeh.dk/2011/07/28/CompositionRoot
export default function configureStore(options) {
  const {
    initialState,
    platformDeps = {},
    platformMiddleware = [],
    platformReducers = {},
  } = options;

  const homeConnect = smartHomeConnect();
  const engine =
    platformDeps.createEngine &&
    platformDeps.createEngine(`redux-storage:${initialState.config.appName}`);
  const firebase = new Firebase(initialState.config.firebaseUrl);

  // // Check whether connection works.
  // firebase.child('hello-world').set({
  //   createdAt: Firebase.ServerValue.TIMESTAMP
  // });

  const middleware = [
    injectMiddleware({
      ...platformDeps,
      engine,
      ...homeConnect,
      fetch: isomorphicFetch,
      firebase,
      getUid: () => shortid.generate(),
      now: () => Date.now(),
      validate
    }),
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
    }),
    ...platformMiddleware
  ];

  if (engine) {
    let decoratedEngine = storageFilter(engine, [
      ['intl', 'currentLocale']
    ]);
    decoratedEngine = storageDebounce(decoratedEngine, 300);
    middleware.push(createStorageMiddleware(decoratedEngine, [], [
      SET_CURRENT_LOCALE
    ]));
  }

  // Logger must be the last middleware in chain.
  if (enableLogger) {
    const logger = createLogger({
      collapsed: true,
      // Convert immutable to JSON.
      stateTransformer: state => JSON.parse(JSON.stringify(state))
    });
    middleware.push(logger);
  }

  const store = createStore(
    configureReducer(initialState, platformReducers),
    initialState,
    applyMiddleware(...middleware)
  );

  // Enable hot reload where available.
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers.
    module.hot.accept('./configureReducer', () => {
      const configureReducer = require('./configureReducer');
      const reducer = configureReducer(initialState, platformReducers);
      store.replaceReducer(reducer);
    });
  }

  return store;
}
