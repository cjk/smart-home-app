import * as actions from './actions';
import Addr from './address';
import Prefs from './preferences';
import { List, Record, Map } from 'immutable';

const InitialState = Record({
  livestate: new Map(),
  eventHistory: List([]),
  prefs: new Prefs({
    rooms: List.of('HALL', 'WZ', 'EZ', 'KIT', 'KND-1', 'KND-2', 'KND-3', 'CEL', 'OFFICE')
  }),
  activeTab: 0,
});

const initialState = new InitialState;
const buildLivestate = (livestate) => new Map(livestate).map(addr => new Addr(addr));

// Note how JSON from server is revived to immutable record.
const revive = ({ livestate, eventHistory }) => initialState.merge({
  livestate: buildLivestate(livestate),
  eventHistory,
});

function updateAddrValue(state, id, value) {
  if (!state.has(id))
    return state;
  return state.update(id, (addr) => addr.set('value', value));
}

export default function connectHomeReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);

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
