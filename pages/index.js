// @flow
import type { State } from '../types';

import * as React from 'react';
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
import Rooms from '../components/Rooms';

// UI: Show available scenes to (de)activate
import Scenes from '../components/Scenes';
// UI: Last changed address-log list
import History from '../components/History';

import { compose } from 'ramda';

const IndexPage = props => {
  const { changeSelectedListTab, ui: { selectedListTab } } = props;
  const handleTabChange = (event, value) => changeSelectedListTab(value);

  return (
    <div className="app">
      <AppBar />
      <TabBar position="static">
        <Tabs value={selectedListTab} onChange={handleTabChange}>
          <Tab label="rooms" />
          <Tab label="scenes" />
          <Tab label="history" />
        </Tabs>
      </TabBar>
      {selectedListTab === 0 && <Rooms />}
      {selectedListTab === 1 && <Scenes />}
      {selectedListTab === 2 && <History />}
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
      ui: state.app.ui,
    }),
    mapDispatchToProps
  ),
  withBusSubscribe,
  withRoot
)(IndexPage);
