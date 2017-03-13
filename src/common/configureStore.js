/* @flow */
import configureMiddleware from './configureMiddleware';
import configureReducer from './configureReducer';
import configureStorage from './configureStorage';
import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';

type Options = {
  initialState: Object,
  platformDeps?: Object,
  platformReducers?: Object,
  platformMiddleware?: Array<Function>,
  platformStoreEnhancers?: Array<Function>,
};

const configureStore = (options: Options) => {
  const {
    initialState,
    platformDeps = {},
    platformMiddleware = [],
    platformReducers = {},
    platformStoreEnhancers = [],
  } = options;

  const reducer = configureReducer(platformReducers, initialState);

  const middleware = configureMiddleware(
    initialState,
    platformDeps,
    platformMiddleware,
  );

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      autoRehydrate(),
      ...platformStoreEnhancers,
    ),
  );

  if (platformDeps.storageEngine) {
    const config = configureStorage(
      initialState.config.appName,
      platformDeps.storageEngine,
    );
    persistStore(store, config);
  }

  // Enable hot reloading for reducers.
  if (module.hot && typeof module.hot.accept === 'function') {
    if (initialState.device.isReactNative) {
      // React Native for some reason needs accept without the explicit path.
      // facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading.html
      module.hot.accept(() => {
        const configureReducer = require('./configureReducer').default;

        store.replaceReducer(configureReducer(platformReducers, initialState));
      });
    } else {
      // Webpack for some reason needs accept with the explicit path.
      module.hot.accept('./configureReducer', () => {
        const configureReducer = require('./configureReducer').default;

        store.replaceReducer(configureReducer(platformReducers, initialState));
      });
    }
  }

  return store;
};

export default configureStore;
