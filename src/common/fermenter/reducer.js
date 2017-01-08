/* @flow */
import type { Action, FermenterState } from './types';
// import R from 'ramda';

const initialState: FermenterState = {
  rts: {
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
    }
  },
  history: {
    switchOps: [],
    emergencies: [],
  },
};

const reducer =
  (state: FermenterState = initialState,
   action: Action,
  ): FermenterState => {
    switch (action.type) {

      case 'PROCESS_STATE': {
        //         console.log(`[fermenterReducer]: new fermenter-state: ${JSON.stringify(action.payload)}`);
        return action.payload.newState;
      }

      default:
        return state;
    }
  };

export default reducer;
