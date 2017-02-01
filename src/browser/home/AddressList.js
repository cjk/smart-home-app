/* @flow */

/* Presentational component to render a simple address-list sorted by most-recently changed */
import type { KnxAddress } from '../../common/types';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import React from 'react';
import { comparator, complement, isNil, map, pipe, sort, values } from 'ramda';

import { Flex, Box } from 'reflexbox';
import {
  Badge,
  Block,
  ButtonCircle,
  Card,
  Space,
  Text,
} from '../app/components';
import { FaSquare, FaSquareO } from 'react-icons/lib/fa';

type Props = {
  addresses: Array<KnxAddress>,
};

const lastUpdated = timestamp => `updated ${distanceInWordsToNow(timestamp)} ago`;

const hasStatus = complement(isNil);
const byHasValue = comparator((a, b) => isNil(b.value) ? hasStatus(a.value) : a.updatedAt > b.updatedAt);

const AddressList = ({ addresses }: Props) => {
  const boxedAddress = address => (
    <Box p={1} sm={8} md={6} lg={4} key={address.id}>
      <Block p={1} borderTop >
        <Flex justify="space-between">
          <Box>
            <Badge rounded theme="info">{address.id}</Badge>
          </Box>
          <Box px={1}>
            <Text>{address.name}</Text>
          </Box>
          <Space />
          <Box>
            <ButtonCircle title={lastUpdated(address.updatedAt)} backgroundColor={address.value ? 'primary' : 'inverted'} >
              { address.value ? <FaSquare /> : <FaSquareO /> }
            </ButtonCircle>
          </Box>
        </Flex>
      </Block>
    </Box>
  );

  const addrLstByDate = pipe(
    values,
    sort(byHasValue), /* put active / on addresses first, but behind recently updated ones (s. below) */
    map(boxedAddress),
    values, /* NOTE: Make last result an array, otherwise React complains about an Object returned by #mapObjIndexed */
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
