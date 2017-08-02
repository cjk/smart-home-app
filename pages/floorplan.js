import React from 'react';

import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import withRoot from '../components/withRoot';
import withBusSubscribe from '../components/withBusSubscribe';
import AppBar from '../components/AppBar';
import { compose } from 'ramda';

const FloorplanPage = () =>
  <div className="app">
    <AppBar />
    <div>
      <svg
        version="1.1"
        viewBox="0 0 210 297"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          transform="scale(.26458)"
          d="m269.07 92.166v96.959h-232.7v561.64h717.21v-561.64h-232.7v-96.959h-251.81z"
          fill="none"
          stroke="#000"
          strokeDasharray="5.15905504, 1.28976378, 0.64488189, 1.28976378"
          strokeWidth=".64488"
        />
      </svg>

    </div>
  </div>;

export default compose(withRedux(createStore), withBusSubscribe, withRoot)(
  FloorplanPage
);
