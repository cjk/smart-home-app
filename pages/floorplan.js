import * as React from 'react';

import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import withRoot from '../components/withRoot';
import withBusSubscribe from '../components/withBusSubscribe';
import AppBar from '../components/AppBar';
import Groundfloor from '../components/Groundfloor';
import { compose } from 'ramda';

const FloorplanPage = () =>
  <div className="app">
    <AppBar />
    <div>
      <Groundfloor />
    </div>
  </div>;

export default compose(withRedux(createStore), withBusSubscribe, withRoot)(
  FloorplanPage
);
