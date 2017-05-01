/* @flow */
import type { FermenterState } from '../../common/fermenter/types';
import { compose, isEmpty, mapObjIndexed, or, values } from 'ramda';
import React from 'react';
import { capitalize } from '../../common/lib/util';
import { Flex } from 'reflexbox';
import { Panel, PanelHeader, Text } from '../components';

import {
  DeviceStateBox,
  LastCmdBox,
  RadioSelectorBox,
} from './fermenterControls';

type Props = {
  fermenterState: FermenterState,
  sendFermenterCmd: Function,
  sendFermenterTempLimits: Function,
};

const Commander = ({
  fermenterState,
  sendFermenterCmd,
  sendFermenterTempLimits,
}: Props) => {
  const { rts: runtimeState, devices } = fermenterState;

  const fermenterIsRunning = () => runtimeState.active;

  const toggleDevice = name => {
    /* Only allow switching fermenter itself on/off for now */
    if (name !== 'fermenter') {
      return false;
    }
    return fermenterIsRunning()
      ? sendFermenterCmd('stop')
      : sendFermenterCmd('start');
  };

  const tempLimitsAsStr = runtimeState.tempLimits
    ? runtimeState.tempLimits.toString()
    : '';

  const setTempRange = e =>
    /* Call action with new selected temp-range but convert numbers it from strings to floats first */
    sendFermenterTempLimits(e.target.value.split(',').map(n => parseFloat(n)));

  const content = or(isEmpty(runtimeState), isEmpty(devices))
    ? <Flex>
        <Text small>No status yet...</Text>
      </Flex>
    : <Flex column>
        {
          <LastCmdBox
            lastCmd={runtimeState.currentCmd}
            isOn={fermenterIsRunning()}
            onChange={() => toggleDevice('fermenter')}
          />
        }
        {compose(
          values,
          mapObjIndexed((dev, name) => (
            <DeviceStateBox
              name={capitalize(name)}
              isOn={dev.isOn}
              key={name}
              onChange={() => toggleDevice(name)}
            />
          ))
        )(devices)}

        <Text>Temperature range</Text>
        <RadioSelectorBox
          name="Temperature"
          label="29 - 31"
          checked={tempLimitsAsStr === '29,31'}
          value={[29, 31]}
          onChange={setTempRange}
        />
        <RadioSelectorBox
          name="Temperature"
          label="30 - 32"
          checked={tempLimitsAsStr === '30,32'}
          value={[30, 32]}
          onChange={setTempRange}
        />
      </Flex>;

  return (
    <Panel theme="secondary">
      <PanelHeader>Control</PanelHeader>
      {content}
    </Panel>
  );
};

export default Commander;
