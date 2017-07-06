// @flow
import type { FermenterState } from '../types/fermenter';

import React from 'react';
import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import App from '../components/App';
import AppBar from '../components/AppBar';

import { compose } from 'ramda';

type props = {
  fermenter: FermenterState,
  subscribeToState: Function,
  unsubscribeToState: Function,
  processState: Function,
  sendFermenterCmd: Function,
  sendFermenterTempLimits: Function,
};

class FermenterPage extends React.Component<void, props, void> {
  componentDidMount() {
    // const { subscribeToState } = this.props;
    // subscribeToState();
    console.log(`Fermenter-State: ${JSON.stringify(this.props.fermenter)}`)
  }

  componentWillUnmount() {
    // const { unsubscribeToState } = this.props;
    // unsubscribeToState();
  }

  render() {
    return (
      <App>
        <div className="app">
          <AppBar />
          <div>
            <h2>Fermenter</h2>
          </div>
        </div>
      </App>
    );
  }
}

export default compose(
  withRedux(createStore, state => ({ fermenter: state.fermenter }))
)(FermenterPage);
