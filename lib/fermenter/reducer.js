/* @flow */

import type { Action, FermenterState } from '../../types/fermenter';

const initialState: FermenterState = {
  rts: {
    active: undefined,
    status: 'unknown',
    hasEnvEmergency: false,
    hasDeviceMalfunction: false,
    currentCmd: 'none',
    tempLimits: undefined,
    humidityLimits: undefined,
    notifications: undefined,
  },
  env: {
    createdAt: 0,
    temperature: 0,
    humidity: 0,
    isValid: false,
    errors: 0,
    iterations: 0,
  },
  devices: {
    heater: {
      isOn: false,
      shouldSwitchTo: null,
      willSwitch: false,
    },
    humidifier: {
      isOn: false,
      shouldSwitchTo: null,
      willSwitch: false,
    },
  },
  history: {
    switchOps: [],
    emergencies: [],
  },
};

const reducer = (
  state: FermenterState = initialState,
  action: Action
): FermenterState => {
  switch (action.type) {
    case 'PROCESS_STATE': {
      return action.newState;
    }

    default:
      return state;
  }
};

export default reducer;
