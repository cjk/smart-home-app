/* @flow */

/* Presentational component to render a simple address-list sorted by most-recently changed */
import type { KnxAddress } from '../../common/types';
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
  actions: Object,
};

const AddressList = ({ addresses, actions }: Props) => {
  /* TODO: Re-add support for actions on addresses */
  const { updateAddr, updateList } = actions;

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
            <ButtonCircle title="status" backgroundColor={!!address.value ? 'primary' : 'inverted'} >
              { !!address.value ? <FaSquare /> : <FaSquareO /> }
            </ButtonCircle>
          </Box>
        </Flex>
      </Block>
    </Box>
  );

  const addrLstByDate = R.pipe(
    R.values,
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

AddressList.propTypes = {
  actions: PropTypes.object.isRequired,
  addresses: PropTypes.object.isRequired,
};

export default AddressList;
