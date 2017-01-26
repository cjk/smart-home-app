/* @flow */
import type FermenterState from '../../common/fermenter/fermenterState';
import R from 'ramda';
import React from 'react';

import { Flex, Box } from 'reflexbox';
import {
  Panel,
  PanelHeader,
  Switch,
  Text,
} from '../app/components';

type Props = {
  fermenterState: FermenterState,
  sendFermenterCmd: () => void,
};

const fermenterIsRunning = rts => rts.active;

const Commander = ({ fermenterState, sendFermenterCmd }: Props) => {
  const { rts: runtimeState, devices } = fermenterState;

  const maybeShowCurrentCmd = R.defaultTo(' -- ');

  const toggleDevice = (name) => {
    /* Only allow switching fermenter itself on/off for now */
    if (name !== 'fermenter') {
      return false;
    }
    return fermenterIsRunning(runtimeState) ? sendFermenterCmd('fermenterStop') : sendFermenterCmd('fermenterStart');
  };

  const deviceStateBox = (name, isOn) =>
    (
      <Box p={1} key={name}>
        <Text>{name}</Text>
        <Switch checked={isOn} onClick={() => toggleDevice(name)} />
      </Box>
    );

  const lastCmdBox = () => (
    <Box p={1}>
      <Text small>Last command was: {maybeShowCurrentCmd(runtimeState.currentCmd)}</Text>
      { deviceStateBox('fermenter', fermenterIsRunning(runtimeState)) }
    </Box>
  );

  const content = R.or(R.isEmpty(runtimeState), R.isEmpty(devices)) ? (
    <Flex>
      <Text small>No status yet...</Text>
    </Flex>
  ) : (
    <Flex column>
      {
        lastCmdBox()
      }
      {
        R.compose(
          R.values,
          R.mapObjIndexed((dev, name) => (
            deviceStateBox(name, dev.isOn)
          )),
        )(devices)
      }
    </Flex>
  );

  return (
    <Panel theme="secondary">
      <PanelHeader>Control</PanelHeader>
      { content }
    </Panel>
  );
};

export default Commander;
