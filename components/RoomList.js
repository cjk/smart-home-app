/* @flow */
import type { KnxAddress, Prefs, State } from '../types';

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

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import AddressLine from '../components/AddressLine';
import AddressListItem from '../components/AddrListItem';

type Props = {
  addresses: Array<KnxAddress>,
  prefs: Prefs,
  classes: Object,
};

const addrListStyles = createStyleSheet('AddressListByRoom', theme => ({
  card: {
    minWidth: 100,
    maxWidth: 768,
  },
  addrList: {
    flexGrow: 1,
    maxWidth: 768,
    background: theme.palette.background.paper,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
}));

const RoomList = ({ addresses, prefs, classes }: Props) => {
  const hasRoom = room => any(equals(room), prefs.rooms);
  const addressesWithRoom = keys(filter(hasRoom, pluck('room', addresses)));

  const createRoomPanels = (addrLst, room) =>
    <Card key={room} className={classes.card}>
      <CardContent>
        <Typography type="body1" className={classes.title}>{room}</Typography>
        <List className={classes.addrList}>
          {addrLst.map(address =>
            <AddressListItem key={address.id} address={address} room={room} />
          )}
        </List>
      </CardContent>
    </Card>;

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

  return (
    <div>
      {addrLstByRoom(addresses)}
    </div>
  );
};

export default compose(
  connect((state: State) => ({
    addresses: state.smartHome.livestate,
    prefs: state.smartHome.prefs,
  })),
  withStyles(addrListStyles)
)(RoomList);
