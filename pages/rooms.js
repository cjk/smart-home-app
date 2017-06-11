import React from 'react';

// import { bindActionCreators } from 'redux';
import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import App from '../components/App';
import AppBar from '../components/AppBar';

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
        <div className="app">
          <AppBar />
          <div style={styles.container}>
            <h3>nothing yet :(</h3>
          </div>
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
