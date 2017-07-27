// @flow
import type { AddressMap, KnxAddress } from '../types';

import React from 'react';

import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import withRoot from '../components/withRoot';
import withBusSubscribe from '../components/withBusSubscribe';
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
    <div className="app">
      <AppBar />
      <div style={styles.container}>
        <AddressList addresses={livestate} />
      </div>
    </div>
  );
};

export default compose(
  withRoot,
  withBusSubscribe,
  withRedux(createStore, state => ({ smartHome: state.smartHome })),
)(IndexPage);
