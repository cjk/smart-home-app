/* @flow */
import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './app/App';
// import Fields from './fields/FieldsPage';
// import Firebase from './firebase/FirebasePage';
import Home from './home/HomePage';
import Intl from './intl/IntlPage';
import Me from './me/MePage';
import NotFound from './notfound/NotFoundPage';
import Offline from './offline/OfflinePage';
import Profile from './me/ProfilePage';
import Settings from './me/SettingsPage';
import SignIn from './auth/SignInPage';
// import Todos from './todos/TodosPage';
import Events from './events/EventsPage';
import Fermenter from './fermenter/FermenterPage';

const createRoutes = (getState: Function) => {
  const requireViewer = (nextState, replace) => {
    if (getState().users.viewer) return;
    replace({
      pathname: '/signin',
      state: { nextPathname: nextState.location.pathname },
    });
  };

  return (
    <Route component={App} path="/">
      <IndexRoute component={Home} />
      <Route component={Intl} path="intl" />
      <Route component={Me} onEnter={requireViewer} path="me">
        <Route component={Profile} path="profile" />
        <Route component={Settings} path="settings" />
      </Route>
      <Route component={Events} path="events" />
      <Route component={Fermenter} path="fermenter" />
      <Route component={Offline} path="offline" />
      <Route component={SignIn} path="signin" />
      <Route component={NotFound} path="*" />
    </Route>
  );
};

export default createRoutes;
