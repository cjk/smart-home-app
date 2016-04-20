import 'babel-polyfill';
import Bluebird from 'bluebird';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../common/configureStore';
import createEngine from 'redux-storage-engine-localstorage';
import createRoutes from './createRoutes';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { addLocaleData } from 'react-intl';
import { browserHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

import de from 'react-intl/locale-data/de';
import en from 'react-intl/locale-data/en';

// bluebirdjs.com/docs/why-bluebird.html
window.Promise = Bluebird;
// Warnings are useful for user code, but annoying for third party libraries.
Bluebird.config({ warnings: false });

// bluebirdjs.com/docs/api/error-management-configuration.html#global-rejection-events
window.addEventListener('unhandledrejection', error => {
  if (process.env.NODE_ENV === 'production') {
    // We don't want to show anything in the user console. Note preventDefault
    // doesn't always work with third party code.
    error.preventDefault();
    // TODO: Report rejection to the server via Firebase. PR anyone?
  } else {
    // We don't want to show plain string warnings in the developer console.
    error.preventDefault();
    /* eslint-disable no-console */
    console.warn('Unhandled promise rejection warning. You can fix it or ignore it.');
    console.log(error.detail.reason);
    /* eslint-enable no-console */
  }
});

// github.com/yahoo/react-intl/wiki/Upgrade-Guide#add-call-to-addlocaledata-in-browser
[de, en].forEach(addLocaleData);

const store = configureStore({
  createEngine,
  initialState: window.__INITIAL_STATE__,
  platformMiddleware: [routerMiddleware(browserHistory)]
});
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store.getState);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
  , document.getElementById('app')
);
