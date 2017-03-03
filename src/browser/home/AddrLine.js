/* @flow */
/* Presentational component to render address-list lines */
import type { KnxAddress } from '../../common/types';
import React from 'react';
import { assoc } from 'ramda';
import { connect } from 'react-redux';
import { writeGroupAddr } from '../../common/home/actions';
import { GoLightBulb, GoPlug, GoCalendar, GoScreenNormal,
         GoCircleSlash, GoAlignmentUnalign, GoStop } from 'react-icons/lib/go';
import { Flex } from 'reflexbox';
import {
  Switch,
  Text,
  Tooltip,
} from '../components';

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

  const toggleAddrVal = addr => assoc('value', !addr.value | 0, addr);

  const updateAddr = addr =>
    writeGroupAddr(toggleAddrVal(addr));


  return (
    <Flex my={2} justify="space-between">
      <Tooltip title={address.id}>
        <Icon size="2em" />
      </Tooltip>
      <Text key={address.id}>
        { address.name }
      </Text>
      <Switch checked={!!address.value} disabled={!switchable(address)} onClick={() => updateAddr(address)} />
    </Flex>
  );
};

export default connect(
  null,
  { writeGroupAddr }
)(AddrLine);
