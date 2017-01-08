/* @flow */
/* Presentational component to render address-list lines */
import type { KnxAddress } from '../../common/types';
import R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { writeGroupAddr } from '../../common/home/actions';
import { GoLightBulb, GoPlug, GoCalendar, GoScreenNormal,
         GoCircleSlash, GoAlignmentUnalign, GoStop } from 'react-icons/lib/go';
import { Flex } from 'reflexbox';
import {
  Switch,
  Text,
} from '../app/components';

type Props = {
  address: KnxAddress,
  writeGroupAddr: typeof writeGroupAddr,
};

const AddrLine = ({ address, writeGroupAddr }: Props) => {
  const switchable = addr => addr.type === 'switch';

  /* Decides which address-item to display */
  const chooseIcon = (addr) => {
    switch (addr.func) {
      case 'light': return GoLightBulb;
      case 'shut': return GoScreenNormal;
      case 'outlet': return GoPlug;
      case 'scene': return GoCalendar;
      case 'contact': return GoAlignmentUnalign;
      case 'inhibit': return GoStop;
      default: return GoCircleSlash;
    }
  };
  const Icon = chooseIcon(address);

  const toggleAddrVal = addr => R.assoc('value', !addr.value | 0, addr);

  const updateAddr = (addr) => {
    return writeGroupAddr(toggleAddrVal(addr));
  }

  return (
    <Flex align="center" my={2} justify="space-between">
      <Icon size="2em" />
      <Text key={address.id}>
        { address.name }
      </Text>
      <Text small>[{ address.id }]</Text>
      <Switch checked={!!address.value} disabled={!switchable(address)} onClick={() => updateAddr(address)} />
    </Flex>
  );
};

export default connect(
  null,
  { writeGroupAddr }
)(AddrLine);
