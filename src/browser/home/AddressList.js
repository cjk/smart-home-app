/* @flow */

/* Presentational component to render a simple address-list sorted by most-recently changed */
import type { KnxAddress } from '../../common/types';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import R from 'ramda';
import React, { PropTypes } from 'react';

import { Flex, Box } from 'reflexbox';
import {
  Badge,
  Block,
  ButtonCircle,
  Card,
  Text,
} from '../app/components';
import { FaSquare, FaSquareO } from 'react-icons/lib/fa';

type Props = {
  addresses: Array<KnxAddress>,
};

const lastUpdated = timestamp => `updated ${distanceInWordsToNow(timestamp)} ago`;

const AddressList = ({ addresses }: Props) => {
  const boxedAddress = address => (
    <Box p={1} col={4} key={address.id}>
      <Block p={1} borderBottom >
        <Flex justify="space-between">
          <Box>
            <Badge rounded theme="info">{address.id}</Badge>
          </Box>
          <Box px={1} auto>
            <Text>{address.name}</Text>
          </Box>
          <Box>
            <ButtonCircle title={lastUpdated(address.updatedAt)} backgroundColor={!!address.value ? 'primary' : 'inverted'} >
              { !!address.value ? <FaSquare /> : <FaSquareO /> }
            </ButtonCircle>
          </Box>
        </Flex>
      </Block>
    </Box>
  );

  const addrLstByDate = R.pipe(
    R.values,
    R.sort((a, b) => !a.value), /* put active / on addresses first, but behind recently updated ones (s. below) */
    R.sort((a, b) => a.updatedAt < b.updatedAt),
    R.map(boxedAddress),
    R.values, /* NOTE: Make last result an array, otherwise React complains about an Object returned by #mapObjIndexed */
  );

  return (
    <Flex column>
      <Card p={0}>
        <Flex wrap>
          {
            addrLstByDate(addresses)
          }
        </Flex>
      </Card>
    </Flex>
  );
};

export default AddressList;
