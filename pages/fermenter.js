// @flow
import type { FermenterState } from '../types/fermenter';
import type { Dispatch } from '../types';

import React from 'react';
import * as fermenterActions from '../lib/fermenter/actions';
import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';

import App from '../components/App';
import AppBar from '../components/AppBar';
import FermenterInfo from '../components/fermenterInfo';
import FermenterControl from '../components/fermenterControl';
import Paper from 'material-ui/Paper';

import { compose } from 'ramda';

type Props = {
  fermenter: FermenterState,
  classes: Object,
  dispatch: Dispatch,
  sendFermenterCmd: Function,
  sendFermenterTempLimits: Function,
  subscribeToState: Function,
  unsubscribeToState: Function,
};

const styles = {
  fermenterRoot: {
    margin: 20,
    padding: 10,
  },
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
    const { sendFermenterCmd, sendFermenterTempLimits } = this.props;

    return (
      <App>
        <div className="app">
          <AppBar />
          <Paper style={styles.fermenterRoot}>
            <FermenterControl
              sendFermenterCmd={sendFermenterCmd}
              sendFermenterTempLimits={sendFermenterTempLimits}
            />
            <FermenterInfo />
          </Paper>
        </div>
      </App>
    );
  }
}

export default compose(withRedux(createStore, null, fermenterActions))(
  FermenterPage
);
