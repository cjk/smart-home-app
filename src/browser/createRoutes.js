import App from './app/App.react';
import Fields from './fields/FieldsPage.react';
import Firebase from './firebase/FirebasePage.react';
import Home from './home/HomePage.react';
import Intl from './intl/IntlPage.react';
import Me from './me/MePage.react';
import NotFound from './notfound/NotFoundPage.react';
import Offline from './offline/OfflinePage.react';
import Profile from './me/ProfilePage.react';
import React from 'react';
import Settings from './me/SettingsPage.react';
import SignIn from './auth/SignInPage.react';
import Events from './events/EventsPage.react';
import Fermenter from './fermenter/FermenterPage.react';
import { IndexRoute, Route } from 'react-router';

export default function createRoutes(getState) {
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
      <Route component={Fields} path="fields" />
      <Route component={Firebase} path="firebase" />
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
}
