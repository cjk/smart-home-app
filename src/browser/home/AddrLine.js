/* @flow */
/* Presentational component to render address-list lines */
import type { KnxAddress } from '../../common/types';
import React, { PropTypes } from 'react';
import { GoLightBulb, GoPlug, GoCalendar, GoScreenNormal,
         GoCircleSlash, GoAlignmentUnalign, GoStop } from 'react-icons/lib/go';
import { Flex } from 'reflexbox';
import {
  Switch,
  Text,
} from '../app/components';

type Props = {
  address: KnxAddress,
  updateAddr: () => void,
};

const AddrLine = ({ address, updateAddr }: Props) => {
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

AddrLine.propTypes = {
  address: PropTypes.object.isRequired,
  updateAddr: PropTypes.func.isRequired,
};

export default AddrLine;
