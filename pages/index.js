// @flow
import type { KnxAddress, State } from '../types';

import React from 'react';
import * as appActions from '../lib/app/actions';
import { bindActionCreators } from 'redux';
import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import withRoot from '../components/withRoot';
import withBusSubscribe from '../components/withBusSubscribe';

// UI: Top menu bar
import AppBar from '../components/AppBar';

// UI: Tabs
import TabBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

// UI: switches grouped by rooms
import RoomList from '../components/RoomList';
import ShowOnlyActiveToggle from '../components/ShowOnlyActiveToggle';

// UI: Last changed address-log list
import AddressList from '../components/AddressList';

import { compose, reject } from 'ramda';

/* Built address-list, remove some address-types which should not be displayed */
const filterAddresses = reject((addr: KnxAddress) => addr.type === 'fb');

const IndexPage = props => {
  const { prefs, rooms, ui: { selectedListTab } } = props.app;
  const { livestate } = props.smartHome;
  const { changeSelectedListTab } = props;
  const handleTabChange = (event, value) => changeSelectedListTab(value);

  return (
    <div className="app">
      <AppBar />
      <TabBar position="static">
        <Tabs value={selectedListTab} onChange={handleTabChange}>
          <Tab label="rooms" />
          <Tab label="history" />
        </Tabs>
      </TabBar>
      {selectedListTab === 0 && (
         <div>
           <ShowOnlyActiveToggle />
           <RoomList
             prefs={prefs}
             rooms={rooms}
             addresses={filterAddresses(livestate)}
           />
         </div>
      )}
      {selectedListTab === 1 && <AddressList addresses={livestate} />}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  const boundActions = bindActionCreators(appActions, dispatch);
  return {
    ...boundActions,
    dispatch,
  };
};

export default compose(
  withRedux(
    createStore,
    (state: State) => ({
      app: state.app,
      smartHome: state.smartHome,
    }),
    mapDispatchToProps
  ),
  withBusSubscribe,
  withRoot
)(IndexPage);
