/* @flow */
import type { KnxAddress } from '../../types';
import React from 'react';

import { blue } from 'material-ui/colors';
import Avatar from 'material-ui/Avatar';

import LightBulbOnIcon from 'material-ui-icons/WbIncandescent';
import InhibutIcon from 'material-ui-icons/Block';
import ShutterIcon from 'material-ui-icons/ViewHeadline';
import PowerIcon from 'material-ui-icons/Power';
import SceneIcon from 'material-ui-icons/BurstMode';
import NotifyOnIcon from 'material-ui-icons/NotificationsActive';
import NotifyOffIcon from 'material-ui-icons/NotificationsNone';
import LuxIcon from 'material-ui-icons/Exposure';
import HeatingIcon from 'material-ui-icons/HotTub';

const onStyle = {
  margin: 10,
  color: '#fff',
  backgroundColor: blue[500],
};

const offStyle = {
  margin: 10,
  color: '#fff',
};

function visualizeAddrValue(addr: KnxAddress) {
  switch (addr.func) {
    case 'light': {
      const IconOn = LightBulbOnIcon;
      const IconOff = LightBulbOnIcon;

      return (
        <Avatar style={addr.value ? onStyle : offStyle}>
          {addr.value ? <IconOn /> : <IconOff />}
        </Avatar>
      );
    }

    case 'shut': {
      const IconOn = ShutterIcon;
      const IconOff = ShutterIcon;

      return (
        <Avatar style={addr.value ? onStyle : offStyle}>
          {addr.value ? <IconOn /> : <IconOff />}
        </Avatar>
      );
    }

    case 'outlet': {
      const IconOn = PowerIcon;
      const IconOff = PowerIcon;

      return (
        <Avatar style={addr.value ? onStyle : offStyle}>
          {addr.value ? <IconOn /> : <IconOff />}
        </Avatar>
      );
    }

    case 'scene': {
      const IconOn = SceneIcon;
      const IconOff = SceneIcon;

      return (
        <Avatar style={addr.value ? onStyle : offStyle}>
          {addr.value ? <IconOn /> : <IconOff />}
        </Avatar>
      );
    }

    case 'contact': {
      const IconOn = NotifyOnIcon;
      const IconOff = NotifyOffIcon;

      return (
        <Avatar style={addr.value ? onStyle : offStyle}>
          {addr.value ? <IconOn /> : <IconOff />}
        </Avatar>
      );
    }

    case 'inhibit': {
      const IconOn = InhibutIcon;
      const IconOff = InhibutIcon;

      return (
        <Avatar style={addr.value ? onStyle : offStyle}>
          {addr.value ? <IconOn /> : <IconOff />}
        </Avatar>
      );
    }

    case 'lux': {
      const IconOn = LuxIcon;
      const IconOff = LuxIcon;

      return (
        <Avatar
          style={addr.value ? onStyle : offStyle}
        >
          {addr.value ? <IconOn /> : <IconOff />}
        </Avatar>
      );
    }

    case 'heat': {
      const IconOn = HeatingIcon;
      const IconOff = HeatingIcon;

      return (
        <Avatar
          style={addr.value ? onStyle : offStyle}
        >
          {addr.value ? <IconOn /> : <IconOff />}
        </Avatar>
      );
    }

    default: {
      return (
        <Avatar style={addr.value ? onStyle : offStyle}>
          ?
        </Avatar>
      );
    }
  }
}

export default visualizeAddrValue;
