/* @flow */
import type { KnxAddress } from '../../common/types';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import React from 'react';

import { curry, defaultTo } from 'ramda';

import {
  Badge,
  ButtonCircle,
  Tooltip,
} from 'rebass';

import { TiMediaStopOutline, TiMediaStop,
         TiLockOpen, TiLockClosed,
         TiFolder, TiFolderOpen,
         TiArrowUpThick, TiArrowDownThick,
         TiFlash, TiCancel,
} from 'react-icons/lib/ti';

const lastUpdated = timestamp => `updated ${distanceInWordsToNow(timestamp)} ago`;
const genTitle = curry(addr => `${addr.func} ${lastUpdated(addr.updatedAt)}`);

function visualizeAddrValue(addr: KnxAddress) {
  const addrTitle = () => genTitle(addr);

  switch (addr.func) {
    case 'light': {
      const IconOn = TiMediaStop;
      const IconOff = TiMediaStopOutline;

      return (
        <ButtonCircle data-space="toggleValue" title={addrTitle()} backgroundColor={addr.value ? 'primary' : 'inverted'}>
          { addr.value ? <IconOn /> : <IconOff /> }
        </ButtonCircle>
      );
    }

    case 'shut': {
      const IconOn = TiArrowDownThick;
      const IconOff = TiArrowUpThick;

      return (
        <ButtonCircle title={addrTitle()} backgroundColor={addr.value ? 'primary' : 'inverted'}>
          { addr.value ? <IconOn /> : <IconOff /> }
        </ButtonCircle>
      );
    }

    case 'outlet': {
      const IconOn = TiFlash;
      const IconOff = TiCancel;

      return (
        <ButtonCircle data-space="toggleValue" title={addrTitle()} backgroundColor={addr.value ? 'primary' : 'inverted'}>
          { addr.value ? <IconOn /> : <IconOff /> }
        </ButtonCircle>
      );
    }

    case 'scene': {
      return (
        <ButtonCircle title={addrTitle()} backgroundColor="primary">
          { `0${defaultTo('?', addr.value)}` }
        </ButtonCircle>
      );
    }

    case 'contact': {
      const IconOn = TiFolderOpen;
      const IconOff = TiFolder;

      return (
        <ButtonCircle title={addrTitle()} backgroundColor={addr.value ? 'primary' : 'inverted'}>
          { addr.value ? <IconOn /> : <IconOff /> }
        </ButtonCircle>
      );
    }

    case 'inhibit': {
      const IconOn = TiLockClosed;
      const IconOff = TiLockOpen;

      return (
        <ButtonCircle data-space="toggleValue" title={addrTitle()} backgroundColor={addr.value ? 'primary' : 'inverted'}>
          { addr.value ? <IconOn /> : <IconOff /> }
        </ButtonCircle>
      );
    }

    case 'lux': {
      return (
        <Tooltip title={addrTitle()}>
          <Badge rounded theme="info">
            { addr.value }
          </Badge>
        </Tooltip>
      );
    }

    default: {
      return (
        <Tooltip title={addrTitle()}>
          <ButtonCircle title={addr.name}>
            { addr.value }
          </ButtonCircle>
        </Tooltip>
      );
    }
  }
}

export default visualizeAddrValue;
