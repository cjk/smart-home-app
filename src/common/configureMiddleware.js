import configureStorage from './configureStorage';
import createLoggerMiddleware from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

// Deps.
import firebase from 'firebase';
import shortid from 'shortid';
import smartHomeConnect from './home/connector';
import validate from './validate';

let firebaseDeps = null;

// Like redux-thunk but with dependency injection.
const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action
  );

export default function configureMiddleware(initialState, platformDeps, platformMiddleware) {
  if (!firebaseDeps) {
    // Lazy init.
    firebase.initializeApp(initialState.config.firebase);
    firebaseDeps = {
      firebase: firebase.database().ref(),
      firebaseAuth: firebase.auth,
      firebaseDatabase: firebase.database,
    };
  }
  // Check whether Firebase works.
  // firebaseDeps.firebase.child('hello-world').set({
  //   createdAt: firebaseDeps.firebaseDatabase.ServerValue.TIMESTAMP,
  //   text: 'Yes!'
  // });

  /* Enable smart-home backend communication */
  const homeConnect = smartHomeConnect();

  const {
    STORAGE_SAVE,
    storageEngine,
    storageMiddleware,
  } = configureStorage(initialState, platformDeps.createStorageEngine);

  const middleware = [
    injectMiddleware({
      ...platformDeps,
      ...homeConnect,
      ...firebaseDeps,
      getUid: () => shortid.generate(),
      now: () => Date.now(),
      storageEngine,
      validate,
    }),
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
    }),
    ...platformMiddleware,
  ];

  if (storageMiddleware) {
    middleware.push(storageMiddleware);
  }

  const enableLogger =
    process.env.NODE_ENV !== 'production' &&
    process.env.IS_BROWSER || initialState.device.isReactNative;

  // Logger must be the last middleware in chain.
  if (enableLogger) {
    const ignoredActions = [STORAGE_SAVE];
    const logger = createLoggerMiddleware({
      collapsed: true,
      predicate: (getState, action) => ignoredActions.indexOf(action.type) === -1,
      // Convert immutable to JSON.
      stateTransformer: state => JSON.parse(JSON.stringify(state))
    });
    middleware.push(logger);
  }

  return middleware;
}
