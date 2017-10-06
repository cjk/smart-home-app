// @flow

// Container-component for Room-grouped visualizations

import type { State, KnxAddress } from '../types';
import * as React from 'react';
import { connect } from 'react-redux';

import { toggleAddrVal } from '../lib/shared/address-utils';

// UI: switches grouped by rooms
import RoomList from '../components/RoomList';
import ShowOnlyActiveToggle from '../components/ShowOnlyActiveToggle';

import { compose, reject } from 'ramda';

/* Built address-list, remove some address-types which should not be displayed */
const filterAddresses = reject((addr: KnxAddress) => addr.type === 'fb');

const Rooms = props => {
  const { addresses, dispatch } = props;
  const { prefs, rooms } = props.app;

  const onAddrSwitch = addr =>
    dispatch({ type: 'WRITE_GROUP_ADDRESS', addr: toggleAddrVal(addr) });

  return (
    <div>
      <ShowOnlyActiveToggle />
      <RoomList
        addresses={filterAddresses(addresses)}
        prefs={prefs}
        rooms={rooms}
        onAddrSwitch={onAddrSwitch}
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
