import * as actions from './actions';
import FermenterEnv from './fermenterEnv';
import FermenterDev from './fermenterDev';
import { List, Record, Map } from 'immutable';

const InitialState = Record({
  env: {},
  devices: Map(),
  envHistory: List(),
});

const initialState = new InitialState;

// Note how JSON from server is revived to immutable record.
const revive = ({ currentState, envHistory }) => initialState.merge({
  envHistory: List(envHistory),
  env: new FermenterEnv(currentState)
});

export default function fermenterReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);

  switch (action.type) {

    case actions.FETCH_FERMENTER_STATE_START: {
      /* Currently no state change on this event */
      return state;
    }

    case actions.FETCH_FERMENTER_STATE_ERROR: {
      console.log('ERROR fetching fermenter-state: ', action.payload);
      return state;
    }

    case actions.FETCH_FERMENTER_STATE_SUCCESS: {
      const s = action.payload.fermenterState;

      /* fermenter state is not available */
      if (!s) {
        return state;
      }

      const env = new FermenterEnv(s.env);
      /* TODO: Map into FermenterDev-struct */
      const devices = s.devices;

      return state
               .set('env', env)
               .set('devices', devices);
    }

  }

  return state;
}
