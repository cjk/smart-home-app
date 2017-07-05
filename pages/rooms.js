import React from 'react';

// import { bindActionCreators } from 'redux';
import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import App from '../components/App';
import WithBusSubsribe from '../components/WithBusSubribe';
import AppBar from '../components/AppBar';
import RoomList from '../components/RoomList';

import { compose } from 'ramda';

const RoomsPage = () =>
  <App>
    <div className="app">
      <AppBar />
      <div>
        <RoomList />
      </div>
    </div>
  </App>;

// const mapDispatchToProps = dispatch => {
//   return {
//     doAction: bindActionCreators(doAction, dispatch),
//   };
// };

export default compose(withRedux(createStore), WithBusSubsribe)(RoomsPage);
