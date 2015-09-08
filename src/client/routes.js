import App from './app/app.react';
import Home from './home/index.react';
import Login from './auth/index.react';
import Me from './me/index.react';
import NotFound from './components/notfound.react';
import React from 'react';
import Events from './events/index.react';
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';

export default (
  <Route handler={App} path="/">
    <DefaultRoute handler={Home} name="home" />
    <NotFoundRoute handler={NotFound} name="not-found" />
    <Route handler={Login} name="login" />
    <Route handler={Me} name="me" />
    <Route handler={Events} name="events" />
  </Route>
);
