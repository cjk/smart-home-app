import type { SmartHomeState } from '../types';

import React from 'react';
import connectClient from '../lib/client';
import { createInitialstateReq$ } from '../lib/shared/create-state-streams';

const WithBusSubsribe = Page =>
  class WithBusSubsribe extends React.Component {
    static async getInitialProps(ctx) {
      let composedInitialProps = {};
      if (Page.getInitialProps) {
        composedInitialProps = await Page.getInitialProps(ctx);
      }

      const { isServer, store } = ctx;

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
      }
      return { ...composedInitialProps };
    }

    // your client-only actions go here:
    componentDidMount() {
      const { dispatch } = this.props;
      dispatch({ type: 'SUBSCRIBE_TO_BUS' });
    }

    render() {
      return <Page {...this.props} />;
    }
  };

export default WithBusSubsribe;
