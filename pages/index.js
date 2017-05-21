import React from 'react';
import { bindActionCreators } from 'redux';
import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import Page from '../components/Page';
import { doAction } from '../lib/app/actions';

class SmartHome extends React.Component {
  static getInitialProps({ store, isServer }) {
    store.dispatch(doAction(isServer));

    return { isServer };
  }

  render() {
    return <Page title="Index Page" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doAction: bindActionCreators(doAction, dispatch),
  };
};

export default withRedux(createStore, null, mapDispatchToProps)(SmartHome);
