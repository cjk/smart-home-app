/* @flow */
import type { KnxAddress, Prefs, State } from '../types';

/* Presentational component to render a simple address-list sorted by most-recently changed */
import React from 'react';
import { connect } from 'react-redux';

import {
  any,
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

import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

type Props = {
  addresses: Array<KnxAddress>,
  prefs: Prefs,
};

const createCardItem = (item, key) =>
  <Card key={key}>
    {item}
  </Card>;

const RoomList = ({ addresses, prefs }: Props) => {
  const hasRoom = room => any(equals(room), prefs.rooms);
  const addressesWithRoom = keys(filter(hasRoom, pluck('room', addresses)));

  const createRoomPanels = (addrLst, room) =>
    createCardItem(
      <CardContent>
        <Typography type="body1">{room}</Typography>
        {addrLst.map(address =>
          <Typography key={address.id} component="p">{address.id}</Typography>
        )}
      </CardContent>,
      room
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

  return (
    <div>
      {addrLstByRoom(addresses)}
    </div>
  );
};

export default connect((state: State) => ({
  addresses: state.smartHome.livestate,
  prefs: state.smartHome.prefs,
}))(RoomList);
