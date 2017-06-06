import React from 'react';

import { bindActionCreators } from 'redux';
import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import App from '../components/App';
import Page from '../components/Page';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

class OtherPage extends React.Component {
  static getInitialProps({ store, isServer }) {
    console.log(`on other page - isServer: ${isServer}`);
    return { isServer };
  }

  render() {
    return (
      <App>
        <div style={styles.container}>
          <Page />
        </div>
      </App>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     doAction: bindActionCreators(doAction, dispatch),
//   };
// };

export default withRedux(createStore)(OtherPage);
