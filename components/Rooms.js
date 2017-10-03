// @flow

// Container-component for Room-grouped visualizations

import type { State, KnxAddress } from '../types';
import React from 'react';
import { connect } from 'react-redux';

// UI: switches grouped by rooms
import RoomList from '../components/RoomList';
import ShowOnlyActiveToggle from '../components/ShowOnlyActiveToggle';

import { compose, reject } from 'ramda';

/* Built address-list, remove some address-types which should not be displayed */
const filterAddresses = reject((addr: KnxAddress) => addr.type === 'fb');

const Rooms = props => {
  const { addresses } = props;
  const { prefs, rooms } = props.app;

  return (
    <div>
      <ShowOnlyActiveToggle />
      <RoomList
        prefs={prefs}
        rooms={rooms}
        addresses={filterAddresses(addresses)}
      />
    </div>
  );
};

export default compose(
  connect((state: State) => ({
    app: state.app,
    addresses: state.smartHome.livestate,
  }))
)(Rooms);
