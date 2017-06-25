// @flow
import type { AddressMap, KnxAddress, SmartHomeState } from '../types';

import React from 'react';

import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import App from '../components/App';
import WithBusSubsribe from '../components/WithBusSubribe';
import AddressList from '../components/AddressList';
import AppBar from '../components/AppBar';

import { compose, reject } from 'ramda';

import connectClient from '../lib/client';
import { createInitialstateReq$ } from '../lib/shared/create-state-streams';

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
};

/* Built address-list, remove some address-types which should not be displayed */
const addrFilter = reject((addr: KnxAddress) => addr.type === 'fb');

class Index extends React.Component {
  static async getInitialProps({ store, isServer }) {
    console.log(
      `[getInitialProps] Dispatching connect client - on server?: ${isServer}`
    );

    // TODO: Perhaps move initial-state-fetching into HOC, like so: https://github.com/zeit/next.js/tree/v3-beta/examples/with-higher-order-component
    if (isServer) {
      const livestate: SmartHomeState = await connectClient()
        .connOpen()
        .switchMap(client => createInitialstateReq$(client))
        .take(1)
        .toPromise();

      // Send livestate to the redux-store as well, so it's available client-side
      await store.dispatch({
        type: 'REQUEST_INITIAL_STATE_SUCCESS',
        livestate,
      });
      return { addresses: addrFilter(livestate), isServer };
    }

    return { isServer, dispatch: store.dispatch };
  }

  render() {
    const { addresses }: AddressMap = this.props;

    return (
      <App>
        <div className="app">
          <AppBar />
          <div style={styles.container}>
            <AddressList addresses={addresses} />
          </div>
        </div>
      </App>
    );
  }
}

export default compose(withRedux(createStore), WithBusSubsribe)(Index);
