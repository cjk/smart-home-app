/* @flow */

/* Presentational component for a room-grouped list of switches */

import type { KnxAddress, Prefs, Rooms } from '../../types';
import * as React from 'react';

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

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

import AddressListItem from '../address/AddrListItem';
import AddressSwitch from '../address/AddrItemSwitch';

type Props = {
  addresses: Array<KnxAddress>,
  prefs: Prefs,
  rooms: Rooms,
  onAddrSwitch: Function,
  classes: Object,
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

const RoomList = ({
  addresses,
  prefs,
  rooms,
  onAddrSwitch,
  classes,
}: Props) => {
  const hasRoom = room => any(equals(room), prefs.rooms);
  const addressesWithRoom = keys(filter(hasRoom, pluck('room', addresses)));
  const getRoomName = room => rooms[room].name;

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

export default compose(withStyles(addrListStyles))(RoomList);
