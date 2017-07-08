// @flow
import type { FermenterState } from '../types/fermenter';
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
  sendFermenterCmd: Function,
  sendFermenterTempLimits: Function,
  subscribeToState: Function,
  unsubscribeToState: Function,
};

class FermenterPage extends React.Component<void, Props, void> {
  // TODO: No server-side-rendering supported yet :(
  static async getInitialProps(ctx) {
    const { store } = ctx;
    return store;
  }

  componentDidMount() {
    this.props.subscribeToState();
  }

  componentWillUnmount() {
    this.props.unsubscribeToState();
  }

  render() {
    const controllerActions = { sendFermenterCmd, sendFermenterTempLimits };
    return (
      <App>
        <div className="app">
          <AppBar />
          <div>
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
  subscribeToState: bindActionCreators(subscribeToState, dispatch),
  unsubscribeToState: bindActionCreators(unsubscribeToState, dispatch),
});

export default compose(withRedux(createStore, null, mapDispatchToProps))(
  FermenterPage
);
