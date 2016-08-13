import * as actions from './actions';
import { AddrRecord } from './address';
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
const buildLivestate = (livestate) => new Map(livestate).map(addr => new AddrRecord(addr));

/* Updates address-objects in a Map (key == address-id) with a new address-object. 'addrLstToUpdate' must be an array
   including another array with address-id/addr-object pairs. */
const updateLivestateAddr = (state, addrLstToUpdate) =>
  addrLstToUpdate.reduce((newState, [id, addr]) => newState.set(id, addr), state);

export default function smartHomeReducer(state = new InitialState, action) {
  switch (action.type) {

    case actions.PROCESS_EVENT: {
      const { newEvent } = action.payload;

      /* Update event-history and/or livestate */
      const newState = state.update('eventHistory', list => list.unshift(newEvent));
      const liveState = newState.livestate;
      const newValue = newEvent.value;
      const addrId = newEvent.dest;
      // console.log(JSON.stringify(newState.livestate));

      /* We're done if it's not a write-request or no address matches */
      if (!liveState.has(addrId) || !newEvent.action.match(/^(write|response)$/))
        return newState;

      const addr = liveState
        .find((v, k) => k === addrId)
        .set('value', newValue)
      ;

      /* List of addrId/addr pairs of addresses to update in livestate */
      const addrLstToUpdate = [[addrId, addr]];

      /* If it's a feedback-address event, update address that references this event-id as it's feedback-addr. instead.
      */
      if (addr.type === 'fb') {
        const fbFor = liveState.find((v, _) => v.fbAddr === addrId);
        if (fbFor) {
          addrLstToUpdate.push([fbFor.id, fbFor.set('value', newValue)]);
        }
      }

      return newState.set('livestate', updateLivestateAddr(liveState, addrLstToUpdate));
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
