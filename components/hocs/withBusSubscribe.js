// @flow

import type DsClient from '../../lib/client';
import type { Action, Dispatch, SmartHomeState } from '../../types';

import logger from 'debug';
import * as React from 'react';
import _DsClient from '../../lib/client';
import { createInitialstateReq$ } from '../../lib/shared/create-state-streams';

type Props = {
  dispatch: Dispatch,
};

const debug = logger('smtApp:withBusSubscribe');

const WithBusSubsribe = (
  Page: React.ComponentType<Props>
): React.ComponentType<any> =>
  class WithBusSubsribe extends React.Component<Props> {
    static async getInitialProps(ctx) {
      let composedInitialProps = {};

      if (Page.getInitialProps) {
        composedInitialProps = await Page.getInitialProps(ctx);
      }

      const { isServer, store } = ctx;

      if (isServer) {
        const dsClient: DsClient = new _DsClient();
        const livestate: SmartHomeState = await dsClient
          .login()
          .switchMap(() => createInitialstateReq$(dsClient.client))
          .take(1)
          .toPromise();

        // Send livestate to the redux-store as well, so it's available client-side
        await store.dispatch(
          ({
            type: 'REQUEST_INITIAL_STATE_SUCCESS',
            livestate,
          }: Action)
        );
        // On the server, close client-connection after initial-state load.
        dsClient.close().subscribe(() => {
          debug('deepstream-connection closed on server.');
        });
      }
      return { ...composedInitialProps };
    }

    // your client-only actions go here:
    componentDidMount() {
      const { dispatch } = this.props;

      dispatch(({ type: 'CONNECTION_STATE_START_TRACKING' }: Action));
      dispatch(({ type: 'SUBSCRIBE_TO_BUS' }: Action));
    }

    componentWillUnmount() {
      // TODO:
      // const { dispatch } = this.props;
      // dispatch(({ type: 'UNSUBSCRIBE_TO_BUS' }: Action));
    }

    render() {
      return <Page {...this.props} />;
    }
  };

export default WithBusSubsribe;
