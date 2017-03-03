/* @flow */

/* Presentational component to render address-list lines */
import type { KnxAddress } from '../../common/types';
import AddrLine from './AddrLine';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { any, equals, filter, groupBy, keys, mapObjIndexed, pick, pipe, pluck, prop, sort, values } from 'ramda';

import { Flex, Box } from 'reflexbox';
import {
  Panel,
  PanelHeader,
  View,
} from '../components';

type Props = {
  addresses: Array<KnxAddress>,
  prefs: Object,
};

const createBoxedItem = (item, key) => (
  <Box key={key} p={2} col={12} lg={6} sm={12}>
    {item}
  </Box>
);

const AddressList = ({ addresses, prefs }: Props) => {
  const hasRoom = room => any(equals(room), prefs.rooms);
  const addressesWithRoom = keys(filter(hasRoom, pluck('room', addresses)));

  const createRoomPanels = (addrLst, room) => (
    createBoxedItem(
      <Panel m={2} theme="primary">
        <PanelHeader><FormattedMessage {...messages[room]} /></PanelHeader>
        {
          addrLst.map(address => (
            <AddrLine address={address} key={address.id} />
          ))
        }
      </Panel>
    , room)
  );

  const addrLstByRoom = pipe(
    pick(addressesWithRoom),
    values,
    sort((a, b) => a.room < b.room),
    groupBy(prop('room')),
    mapObjIndexed(createRoomPanels),
    values /* NOTE: Make last result an array, otherwise React complains about an Object returned by #mapObjIndexed */
  );

  /* DEBUGGING */
  //   console.log(`[addrLstByRoom] ${JSON.stringify(addrLstByRoom)}`);

  return (
    <View className="addressListByRoom">
      <Flex wrap gutter={2}>
        {
          addrLstByRoom(addresses)
        }
      </Flex>
    </View>
  );
};

export default AddressList;
