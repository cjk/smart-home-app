// @flow
import type { Action, FermenterState } from '../types/fermenter';
import type { Dispatch } from '../types';

import React from 'react';
import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import App from '../components/App';
import AppBar from '../components/AppBar';

import { compose } from 'ramda';

type Props = {
  fermenter: FermenterState,
  dispatch: Dispatch,
  // sendFermenterCmd: Function,
  // sendFermenterTempLimits: Function,
};

class FermenterPage extends React.Component<void, Props, void> {
  // TODO: No server-side-rendering supported yet :(
  static async getInitialProps(ctx) {
    const { store } = ctx;
    return store;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(({ type: 'SUBSCRIBE_TO_STATE' }: Action));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(({ type: 'UNSUBSCRIBE_TO_STATE' }: Action));
  }

  render() {
    return (
      <App>
        <div className="app">
          <AppBar />
          <div>
            <h2>Fermenter:</h2>
            <p>
              {this.props.fermenter.rts.status}
            </p>
          </div>
        </div>
      </App>
    );
  }
}

export default compose(
  withRedux(createStore, state => ({ fermenter: state.fermenter }))
)(FermenterPage);
