import React from 'react';

// import { bindActionCreators } from 'redux';
import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import App from '../components/App';
import AppBar from '../components/AppBar';
import RoomList from '../components/RoomList';

class RoomsPage extends React.Component {
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
          <div>
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

export default withRedux(createStore)(RoomsPage);
