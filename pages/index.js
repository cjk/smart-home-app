import * as React from 'react';

import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import withRoot from '../components/hocs/withRoot';
import withBusSubscribe from '../components/hocs/withBusSubscribe';
import AppBar from '../components/AppBar';
import Dashboard from '../components/dashboard';
import { compose } from 'ramda';

const IndexPage = () => (
  <div className="app">
    <AppBar />
    <Dashboard />

    {/* Add Gradient */}
    <style global jsx>{`
      .app {
        background: linear-gradient(to bottom, grey 0, white 160px);
        filter: progid:DXImageTransform.Microsoft.gradient(
            startColorstr='grey',
            endColorstr='white',
            GradientType=0
          );
      }
    `}</style>
  </div>
);

export default compose(withRedux(createStore), withBusSubscribe, withRoot)(
  IndexPage
);
