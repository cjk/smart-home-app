// @flow
import React from 'react';
import { makeRouteConfig, Route } from 'found/lib/jsx';

// Pages
import App from './App';
import HomePage from '../home/HomePage';
import EventsPage from '../events/EventsPage';
import FermenterPage from '../fermenter/FermenterPage';

const routeConfig = makeRouteConfig(
  <Route path="/" Component={App}>
    <Route Component={HomePage}>
      <Route path="rooms" />
    </Route>
    <Route path="fermenter" Component={FermenterPage} />
    <Route path="events" Component={EventsPage} />
  </Route>
);

export default routeConfig;
