import * as actions from './actions';
import Addr from './address';
import Prefs from './preferences';
import { List, Map } from 'immutable';
import { Record } from '../transit';

const InitialState = Record({
  livestate: new Map(),
  eventHistory: new List(),
  prefs: new Prefs({
    rooms: List.of(
      'hall-1', 'hall-2', 'hby', 'wz', 'ez', 'kit', 'knd-1', 'knd-2', 'knd-3', 'cel-1', 'cel-2', 'cel-3', 'office',
    ),
  }),
  activeTab: 0,
}, 'smartHome');

/* PENDING: This should no longer be needed once we use transit-js to serialize
 * backend-communication */
const buildLivestate = (livestate) => new Map(livestate).map(addr => new Addr(addr));

function updateAddrValue(state, id, value) {
  if (!state.has(id)) {
    return state;
  }
  return state.update(id, (addr) => addr.set('value', value));
}

export default function smartHomeReducer(state = new InitialState, action) {
  switch (action.type) {

    case actions.PROCESS_EVENT: {
      const { newEvent } = action.payload;

      /* Update event-history and/or livestate */
      const newState = state.update('eventHistory', list => list.unshift(newEvent));

      if (newEvent.action.match(/^(write|response)$/)) {
        return newState.set('livestate',
                            updateAddrValue(state.livestate, newEvent.dest, newEvent.value));
      }
      return newState;
    }

    case actions.REQUEST_INITIAL_STATE_START: {
      /* Currently no state change on this event */
      return state;
    }

    case actions.REQUEST_INITIAL_STATE_SUCCESS: {
      return state.set('livestate', buildLivestate(action.payload));
    }

    case actions.WRITE_GROUP_ADDRESS_START: {
      /* Currently no state change on this event */
      return state;
    }

    case actions.WRITE_GROUP_ADDRESS_SUCCESS: {
      /* Currently no state change on this event */
      return state;
    }

    case actions.SWITCH_TO_TAB: {
      const { tabId } = action.payload;
      return state.set('activeTab', tabId);
    }
  }

  return state;
}
