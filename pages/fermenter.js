// @flow
import type { Action, FermenterState } from '../types/fermenter';
import type { Dispatch } from '../types';

import React from 'react';
import { bindActionCreators } from 'redux';
import {
  subscribeToState,
  unsubscribeToState,
  sendFermenterCmd,
  sendFermenterTempLimits,
} from '../lib/fermenter/actions';
import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';

import App from '../components/App';
import AppBar from '../components/AppBar';
import FermenterInfo from '../components/fermenterInfo';
import FermenterControl from '../components/fermenterControl';

import { compose } from 'ramda';

type Props = {
  fermenter: FermenterState,
  dispatch: Dispatch,
  sendFermenterCmd: Action,
  sendFermenterTempLimits: Action,
};

class FermenterPage extends React.Component<void, Props, void> {
  // TODO: No server-side-rendering supported yet :(
  static async getInitialProps(ctx) {
    const { store } = ctx;
    return store;
  }

  componentDidMount() {
    subscribeToState();
  }

  componentWillUnmount() {
    unsubscribeToState();
  }

  render() {
    const controllerActions = { sendFermenterCmd, sendFermenterTempLimits };
    return (
      <App>
        <div className="app">
          <AppBar />
          <div>
            <h2>Fermenter:</h2>
            <FermenterInfo />
            <FermenterControl {...controllerActions} />
          </div>
        </div>
      </App>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendFermenterCmd: bindActionCreators(sendFermenterCmd, dispatch),
  sendFermenterTempLimits: bindActionCreators(
    sendFermenterTempLimits,
    dispatch
  ),
});

export default compose(withRedux(createStore, null, mapDispatchToProps))(
  FermenterPage
);
