/* @flow */
import type { Dispatch, KnxAddress, Prefs, Rooms, State } from '../types';

/* Presentational component to render a simple address-list sorted by most-recently changed */
import React from 'react';
import { connect } from 'react-redux';

import {
  any,
  compose,
  equals,
  filter,
  groupBy,
  identity,
  keys,
  mapObjIndexed,
  pick,
  pipe,
  pluck,
  prop,
  propEq,
  sort,
  values,
} from 'ramda';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';

import AddressListItem from '../components/AddrListItem';
import AddressSwitch from '../components/AddrItemSwitch';
import { toggleAddrVal } from '../lib/shared/address-utils';

type Props = {
  addresses: Array<KnxAddress>,
  prefs: Prefs,
  rooms: Rooms,
  classes: Object,
  dispatch: Dispatch,
};

const addrListStyles = theme => ({
  room: {
    // maxWidth: 1024,
    // minWidth: 100,
    margin: 10,
    textAlign: 'center',
  },
  roomTitle: {
    padding: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  addrList: {
    background: theme.palette.background.paper,
    textAlign: 'auto',
  },
});

const RoomList = ({ addresses, dispatch, prefs, rooms, classes }: Props) => {
  const hasRoom = room => any(equals(room), prefs.rooms);
  const addressesWithRoom = keys(filter(hasRoom, pluck('room', addresses)));
  const getRoomName = room => rooms[room].name;
  const onAddrSwitch = addr =>
    dispatch({ type: 'WRITE_GROUP_ADDRESS', addr: toggleAddrVal(addr) });

  const createRoomPanels = (addrLst, room) => (
    <Paper key={room} className={classes.room}>
      <Typography type="title" className={classes.roomTitle}>
        {getRoomName(room)}
      </Typography>
      <List className={classes.addrList}>
        {addrLst.map(address => (
          <AddressListItem
            key={address.id}
            address={address}
            addrSwitch={
              <AddressSwitch switchAction={onAddrSwitch} address={address} />
            }
          />
        ))}
      </List>
    </Paper>
  );

  const onlyActiveRooms = rooms => filter(any(propEq('value', 1)), rooms);

  const addrLstByRoom = pipe(
    pick(addressesWithRoom),
    values,
    sort((a, b) => a.room < b.room),
    groupBy(prop('room')),
    prefs.showOnlyActive ? onlyActiveRooms : identity,
    mapObjIndexed(createRoomPanels),
    values /* NOTE: Make last result an array, otherwise React complains about an Object returned by #mapObjIndexed */
  );

  return <div>{addrLstByRoom(addresses)}</div>;
};

export default compose(
  connect((state: State) => ({
    addresses: state.smartHome.livestate,
    prefs: state.app.prefs,
    rooms: state.app.rooms,
  })),
  withStyles(addrListStyles)
)(RoomList);
