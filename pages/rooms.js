import React from 'react';

import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import App from '../components/App';
import withBusSubscribe from '../components/withBusSubscribe';
import AppBar from '../components/AppBar';
import RoomList from '../components/RoomList';

import { compose } from 'ramda';

const RoomsPage = () =>
  <App>
    <div className="app">
      <AppBar />
      <div>
        <RoomList />
      </div>
    </div>
  </App>;

export default compose(withRedux(createStore), withBusSubscribe)(RoomsPage);
