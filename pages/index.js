// @flow
import type { AddressMap, KnxAddress } from '../types';

import React from 'react';

import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import App from '../components/App';
import WithBusSubsribe from '../components/WithBusSubribe';
import AddressList from '../components/AddressList';
import AppBar from '../components/AppBar';

import { compose, reject } from 'ramda';

const styles = {
  container: {
    textAlign: 'center',
    padding: '10px',
  },
};

/* Built address-list, remove some address-types which should not be displayed */
const addrFilter = reject((addr: KnxAddress) => addr.type === 'fb');

const IndexPage = props => {
  const { livestate }: AddressMap = addrFilter(props.smartHome);

  return (
    <App>
      <div className="app">
        <AppBar />
        <div style={styles.container}>
          <AddressList addresses={livestate} />
        </div>
      </div>
    </App>
  );
};

export default compose(
  withRedux(createStore, state => ({ smartHome: state.smartHome })),
  WithBusSubsribe
)(IndexPage);
