/* @flow */
import type { Action, SmartHomeState } from '../types';
import R from 'ramda';

const initialState = {
  livestate: {},
  eventHistory: [],
  prefs: {
    rooms: [
      'hall-1', 'hall-2', 'hby', 'wz', 'ez', 'kit', 'knd-1', 'knd-2', 'knd-3', 'cel-1', 'cel-2', 'cel-3', 'office',
    ]
  },
  activeTab: 0,
};

const reducer = (
  state: SmartHomeState = initialState,
  action: Action,
): SmartHomeState => {
  switch (action.type) {

    case 'PROCESS_EVENT': {
      console.log(`[home-reducer] PROCESS_EVENT: ${JSON.stringify(state)}`)
      const { newEvent } = action.payload;

      const eHstLens = R.lens(R.prop('eventHistory'), R.assoc('eventHistory'));
      const newEventHistory = R.prepend(newEvent, R.view(eHstLens, state))
      const  { dest, value, action: eventAct } = newEvent;

      /* Livestate is only affected if address is present and is a mutating action */
      if (!R.has(dest, state.livestate) || !eventAct.match(/^(write|response)$/))
        /* Update only event-history */
        return R.set(eHstLens, newEventHistory, state);

      //       const addrLens = R.lensProp(dest);
      const addrValLens = R.lensPath(['livestate', dest, 'value']);
      return R.set(addrValLens, value, state);

      // const addr = liveState
      //   .find((v, k) => k === addrId)
      //   .set('value', newValue)
      // ;

      /* List of addrId/addr pairs of addresses to update in livestate */
      //       const addrLstToUpdate = [[addrId, addr]];

      /* If it's a feedback-address event, update address that references this event-id as it's feedback-addr. instead.
       */
      // if (addr.type === 'fb') {
      //   const fbFor = liveState.find((v, _) => v.fbAddr === addrId);
      //   if (fbFor) {
      //     addrLstToUpdate.push([fbFor.id, fbFor.set('value', newValue)]);
      //   }
      // }

      //       return newState.set('livestate', updateLivestateAddr(liveState, addrLstToUpdate));
    }

    case 'REQUEST_INITIAL_STATE': {
      /* Currently no state change on this event */
      return state;
    }

    case 'REQUEST_INITIAL_STATE_SUCCESS': {
      return R.assoc('livestate', action.payload, state);
    }

    case 'WRITE_GROUP_ADDRESS_START': {
      /* Currently no state change on this event */
      return state;
    }

    case 'WRITE_GROUP_ADDRESS_SUCCESS': {
      /* Currently no state change on this event */
      return state;
    }

    case 'SWITCH_TO_TAB': {
      const { tabId } = action.payload;
      return R.assoc('activeTab', tabId, state);
    }

    default:
      console.log(`[home-reducer] returning default state: ${JSON.stringify(state)}`);
      return state;
  }
}

export default reducer;
