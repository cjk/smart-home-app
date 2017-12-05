// @flow
import type { State } from '../types';

import * as React from 'react';
import * as appActions from '../lib/app/actions';
import { bindActionCreators } from 'redux';
import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import withRoot from '../components/hocs/withRoot';
import withBusSubscribe from '../components/hocs/withBusSubscribe';

// UI: Top menu bar
import AppBar from '../components/AppBar';

// UI: Tabs
import TabBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

// UI: Groundfloor map (NOTE: no container-component yet)
import Groundfloor from '../components/Groundfloor';
// UI: switches grouped by rooms
import Rooms from '../components/rooms';
// UI: Show available scenes to (de)activate
import Scenes from '../components/scenes';
// UI: Show available scenes to (de)activate
import Cronjobs from '../components/cron';
// UI: Last changed address-log list
import History from '../components/history';

import { compose } from 'ramda';

const MainPage = props => {
  const { changeSelectedListTab, ui: { selectedListTab } } = props;
  const handleTabChange = (event, value) => changeSelectedListTab(value);

  return (
    <div className="app">
      <AppBar />
      <TabBar position="static">
        <Tabs value={selectedListTab} onChange={handleTabChange}>
          <Tab label="map" />
          <Tab label="rooms" />
          <Tab label="scenes" />
          <Tab label="cronjobs" />
          <Tab label="history" />
        </Tabs>
      </TabBar>
      {selectedListTab === 0 && <Groundfloor />}
      {selectedListTab === 1 && <Rooms />}
      {selectedListTab === 2 && <Scenes />}
      {selectedListTab === 3 && <Cronjobs />}
      {selectedListTab === 4 && <History />}

      {/* Add Gradient */}
      <style global jsx>{`
      .app {
        background: linear-gradient(to bottom, grey 0, white 160px);
        filter: progid:DXImageTransform.Microsoft.gradient(
            startColorstr='grey',
            endColorstr='white',
            GradientType=0
          );
      }
    `}</style>

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
)(MainPage);
