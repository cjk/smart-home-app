/* @flow */

import type { Action, SmartHomeState } from '../types';
import { __, assoc, has, lens, lensPath, merge, pipe, prepend, prop, set, view } from 'ramda';

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

const eHstLens = lens(prop('eventHistory'), assoc('eventHistory'));

const reducer = (
  state: SmartHomeState = initialState,
  action: Action,
): SmartHomeState => {
  switch (action.type) {

    case 'PROCESS_EVENT': {
      const { newEvent } = action.payload;

      const newState = pipe(
        view(eHstLens),
        prepend(newEvent),
        set(eHstLens, __, state),
      )(state);

      const { dest, value, action: eventAct } = newEvent;

      /* Livestate is only affected if address is present and is a mutating action */
      if (!has(dest, state.livestate) || !eventAct.match(/^(write|response)$/)) {
        /* Return only updated event-history */
        return newState;
      }

      /* Also update livestate with new address-value */
      const address = newState.livestate[dest];
      const addrValLens = lensPath(['livestate', dest]);

      return set(addrValLens, merge(address, { value, updatedAt: Date.now() }), newState);
    }

    case 'REQUEST_INITIAL_STATE_SUCCESS': {
      return assoc('livestate', action.payload, state);
    }

    default:
      return state;
  }
};

export default reducer;
