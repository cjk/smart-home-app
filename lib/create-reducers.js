// @flow
import { combineReducers } from 'redux';

import home from './home/reducer';

// const makeReducersHotReloadable = (store, platformReducers) => {
//   if (!module.hot || typeof module.hot.accept !== 'function') return;
//   module.hot.accept('./create-redux-reducer', () => {
//     // eslint-disable-next-line global-require
//     const createReduxReducer = require('./create-redux-reducer').default;
//     store.replaceReducer(createReduxReducer(platformReducers));
//   });
// };

export default () =>
  combineReducers({
    home,
  });
