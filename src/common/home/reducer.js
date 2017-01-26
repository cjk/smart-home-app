/* @flow */

import type { Action, SmartHomeState } from '../types';
import R from 'ramda';

const initialState = {
  livestate: {},
  eventHistory: [],
  prefs: {
    rooms: [
      'hall-1', 'hall-2', 'hby', 'wz', 'ez', 'kit', 'knd-1', 'knd-2', 'knd-3', 'cel-1', 'cel-2', 'cel-3',
      'office', 'rest',
    ]
  },
};

const eHstLens = R.lens(R.prop('eventHistory'), R.assoc('eventHistory'));

const reducer = (
  state: SmartHomeState = initialState,
  action: Action,
): SmartHomeState => {
  switch (action.type) {

    case 'PROCESS_EVENT': {
      const { newEvent } = action.payload;

      const newState = R.pipe(
        R.view(eHstLens),
        R.prepend(newEvent),
        R.set(eHstLens, R.__, state),
      )(state);
      // const newEventHistory = R.prepend(newEvent, R.view(eHstLens, state));
      // const updateEventHistory = R.set(eHstLens, newEventHistory);

      const { dest, value, action: eventAct } = newEvent;

      /* Livestate is only affected if address is present and is a mutating action */
      if (!R.has(dest, state.livestate) || !eventAct.match(/^(write|response)$/)) {
        /* Return only updated event-history */
        return newState;
      }

      /* Also update livestate with new address-value */
      const addrValLens = R.lensPath(['livestate', dest, 'value']);
      return R.set(addrValLens, value, newState);
    }

    case 'REQUEST_INITIAL_STATE_SUCCESS': {
      return R.assoc('livestate', action.payload, state);
    }

    default:
      return state;
  }
};

export default reducer;
