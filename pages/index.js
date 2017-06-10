// @flow
import React from 'react';

import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import App from '../components/App';
import AddressList from '../components/Address-List';

import connectClient from '../lib/client';
import { createInitialstateReq$ } from '../lib/shared/create-state-streams';
import { requestInitialStateSuccess } from '../lib/home/actions';
import { reject } from 'ramda';

import AppBar from '../components/App-bar';

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
};

/* Built address-list, remove some address-types which should not be displayed */
const addrFilter = reject(addr => addr.type === 'fb');

class Index extends React.Component {
  static async getInitialProps({ store, isServer }) {
    console.log(
      `[getInitialProps] Dispatching connect client - on server?: ${isServer}`
    );

    if (isServer) {
      const livestate = await connectClient()
        .connOpen()
        .switchMap(client => createInitialstateReq$(client))
        .take(1)
        .toPromise();

      // Send livestate to the redux-store as well, so it's available client-side
      await store.dispatch(requestInitialStateSuccess(livestate));
      return { addresses: addrFilter(livestate), isServer };
    }

    return { isServer };
  }

  render() {
    const { addresses } = this.props;

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

export default withRedux(createStore)(Index);
