/* @flow */
import type { KnxAddress } from '../../types';
import React from 'react';

import { blue } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import LightBulbIcon from 'material-ui-icons/LightbulbOutline';

const onStyle = {
  margin: 10,
  color: '#fff',
  backgroundColor: blue[500],
};

const offStyle = {
  margin: 10,
};

function visualizeAddrValue(addr: KnxAddress) {
  switch (addr.func) {
    case 'light': {
      const IconOn = LightBulbIcon;
      const IconOff = LightBulbIcon;

      return (
        <Avatar
          data-space="toggleValue"
          style={addr.value ? onStyle : offStyle}
        >
          {addr.value ? <IconOn /> : <IconOff />}
        </Avatar>
      );
    }

    case 'shut': {
      const IconOn = LightBulbIcon;
      const IconOff = LightBulbIcon;

      return (
        <Avatar
          data-space="toggleValue"
          style={addr.value ? onStyle : offStyle}
        >
          {addr.value ? <IconOn /> : <IconOff />}
        </Avatar>
      );
    }

    case 'outlet': {
      const IconOn = LightBulbIcon;
      const IconOff = LightBulbIcon;

      return (
        <Avatar
          data-space="toggleValue"
          style={addr.value ? onStyle : offStyle}
        >
          {addr.value ? <IconOn /> : <IconOff />}
        </Avatar>
      );
    }

    case 'scene': {
      const IconOn = LightBulbIcon;
      const IconOff = LightBulbIcon;

      return (
        <Avatar
          data-space="toggleValue"
          style={addr.value ? onStyle : offStyle}
        >
          {addr.value ? <IconOn /> : <IconOff />}
        </Avatar>
      );
    }

    case 'contact': {
      const IconOn = LightBulbIcon;
      const IconOff = LightBulbIcon;

      return (
        <Avatar
          data-space="toggleValue"
          style={addr.value ? onStyle : offStyle}
        >
          {addr.value ? <IconOn /> : <IconOff />}
        </Avatar>
      );
    }

    case 'inhibit': {
      const IconOn = LightBulbIcon;
      const IconOff = LightBulbIcon;

      return (
        <Avatar
          data-space="toggleValue"
          style={addr.value ? onStyle : offStyle}
        >
          {addr.value ? <IconOn /> : <IconOff />}
        </Avatar>
      );
    }

    case 'lux': {
      const IconOn = LightBulbIcon;
      const IconOff = LightBulbIcon;

      return (
        <Avatar
          data-space="toggleValue"
          style={addr.value ? onStyle : offStyle}
        >
          {addr.value ? <IconOn /> : <IconOff />}
        </Avatar>
      );
    }

    default: {
      const IconOn = LightBulbIcon;
      const IconOff = LightBulbIcon;

      return (
        <Avatar
          data-space="toggleValue"
          style={addr.value ? onStyle : offStyle}
        >
          {addr.value ? <IconOn /> : <IconOff />}
        </Avatar>
      );
    }
  }
}

export default visualizeAddrValue;
