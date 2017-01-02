/* @flow */
import type RunTimeState from '../../common/fermenter/fermenterState';
import R from 'ramda';
import React, { PropTypes } from 'react';

import { Flex } from 'reflexbox';
import {
  Panel,
  PanelHeader,
  Switch,
  Text,
} from '../app/components';

type Props = {
  runtimeState: RunTimeState,
  sendFermenterCmd: () => void,
};

const fermenterIsRunning = fermStatus => fermStatus === 'running';

const Commander = ({ runtimeState, sendFermenterCmd }: Props) => {
  const maybeShowCurrentCmd = R.defaultTo(' -- ');

  const toggleFermenter = () => fermenterIsRunning(runtimeState.status) ?
                              sendFermenterCmd('fermenterStop') :
                              sendFermenterCmd('fermenterStart');

  const content = R.isEmpty(runtimeState.status) ? (
    <Flex>
      <Text small>No status yet...</Text>
    </Flex>
  ) : (
    <Flex>
      <Switch checked={!!fermenterIsRunning(runtimeState.status)} onClick={() => toggleFermenter()} />
      <Text small>Last command was: {maybeShowCurrentCmd(runtimeState.currentCmd)}</Text>
    </Flex>
  );

  return (
    <Panel theme="secondary">
      <PanelHeader>Control</PanelHeader>
      { content }
    </Panel>
  );
};

Commander.propTypes = {
  runtimeState: PropTypes.object.isRequired,
  sendFermenterCmd: PropTypes.func.isRequired,
};


export default Commander;
