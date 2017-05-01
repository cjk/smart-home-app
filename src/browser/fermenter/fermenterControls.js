import React from 'react';
import { defaultTo } from 'ramda';
import { Box } from 'reflexbox';
import { Switch, Radio, Text } from '../components';

type DeviceStateProps = {
  name: string,
  isOn: boolean,
  onChange?: Function,
};

type LastCmdProps = {
  lastCmd: string,
  isOn: boolean,
  onChange?: Function,
};

type RadioSelectorProps = {
  name: string,
  label: string,
  checked: boolean,
  value: string,
  onChange?: Function,
};

const maybeShowCurrentCmd = defaultTo(' -- ');

const DeviceStateBox = ({ name, isOn, onChange }: DeviceStateProps) => (
  <Box p={1} key={name}>
    <Text>{name}</Text>
    <Switch checked={isOn} onClick={onChange} />
  </Box>
);

const LastCmdBox = ({ lastCmd, isOn, onChange }: LastCmdProps) => (
  <Box p={1}>
    <Text small>
      Last command was: {maybeShowCurrentCmd(lastCmd)}
    </Text>
    <DeviceStateBox name="Fermenter" isOn={isOn} onChange={onChange} />
  </Box>
);

const RadioSelectorBox = ({ name, label, checked, value, onChange }: RadioSelectorProps) => (
  <Box p={1} key={name}>
    <Radio name={name} checked={checked} label={label} value={value} onChange={onChange} />
  </Box>
);

export { DeviceStateBox, LastCmdBox, RadioSelectorBox };
