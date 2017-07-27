import React from 'react';

import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import withRoot from '../components/withRoot';
import withBusSubscribe from '../components/withBusSubscribe';
import AppBar from '../components/AppBar';
import RoomList from '../components/RoomList';

import { compose } from 'ramda';

const RoomsPage = () =>
  <div className="app">
    <AppBar />
    <div>
      <RoomList />
    </div>
  </div>;

export default compose(withRedux(createStore), withBusSubscribe, withRoot)(
  RoomsPage
);
