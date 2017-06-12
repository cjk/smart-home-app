import React from 'react';

// import { bindActionCreators } from 'redux';
import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import App from '../components/App';
import AppBar from '../components/AppBar';
import RoomList from '../components/RoomList';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

class OtherPage extends React.Component {
  static getInitialProps({ store, isServer }) {
    console.log(`on other page - isServer: ${isServer}`);
    // TODO: request props for SSR here!
    return { isServer };
  }

  render() {
    return (
      <App>
        <div className="app">
          <AppBar />
          <div style={styles.container}>
            <RoomList />
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
