import * as actions from './actions';
import TempHumEntry from './tempHumidity';
import {List, Record} from 'immutable';

const InitialState = Record({
  currentState: {},
  envHistory: List(),
});

const initialState = new InitialState;

// Note how JSON from server is revived to immutable record.
const revive = ({currentState, envHistory}) => initialState.merge({
  /*   envHistory: envHistory.map(tmpHumEntry => new TempHumEntry(tmpHumEntry)) */
  envHistory: List(envHistory),
  currentState: new TempHumEntry(currentState)
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
      const tempHumEntry = new TempHumEntry(action.payload.fermenterState);
      return state.set('currentState', tempHumEntry);
    }

  }

  return state;
}
