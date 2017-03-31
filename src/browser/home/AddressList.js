/* @flow */

/* Presentational component to render a simple address-list sorted by most-recently changed */
import type { KnxAddress } from '../../common/types';
import React from 'react';
import visualizeAddrValue from './visualizeAddresses';
import { comparator, complement, isNil, map, pipe, sort, values } from 'ramda';

import { Flex, Box } from 'reflexbox';
import { Badge, Block, Text } from '../components';

type Props = {
  addresses: Array<KnxAddress>,
};

const hasStatus = complement(isNil);
const byHasValue = comparator(
  (a, b) => isNil(b.value) ? hasStatus(a.value) : a.updatedAt > b.updatedAt
);

const AddressList = ({ addresses }: Props) => {
  const boxedAddress = address => (
    <Box p={1} col={12} key={address.id}>
      <Block py={1} borderTop>
        <Flex justify="space-between">
          <Box col={2}>
            <Badge rounded theme="info">{address.id}</Badge>
          </Box>
          <Box col={8}>
            <Text>{address.name}</Text>
          </Box>
          <Box
            col={2}
            onClick={e => {
              console.log(
                `Clicked ${e.target} with data ${JSON.stringify(e.target.dataset)}`
              );
            }}
          >
            {visualizeAddrValue(address)}
          </Box>
        </Flex>
      </Block>
    </Box>
  );

  const addrLstByDate = pipe(
    values,
    sort(
      byHasValue
    ) /* put active / on addresses first, but behind recently updated ones (s. below) */,
    map(boxedAddress),
    values /* NOTE: Make last result an array, otherwise React complains about an Object returned by #mapObjIndexed */
  );

  return (
    <Flex column>
      <Flex wrap>
        {addrLstByDate(addresses)}
      </Flex>
    </Flex>
  );
};

export default AddressList;
