import React from 'react';
import { bindActionCreators } from 'redux';
import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import Page from '../components/Page';

class OtherPage extends React.Component {
  static getInitialProps({ store, isServer }) {
    console.log(`on other page - isServer: ${isServer}`);
    return { isServer };
  }

  render() {
    return <Page />;
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     doAction: bindActionCreators(doAction, dispatch),
//   };
// };

export default withRedux(createStore)(OtherPage);
