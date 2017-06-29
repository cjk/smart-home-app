/* @flow */

import type { Action, BusEvent, SmartHomeState } from '../../types';
import {
  __,
  assoc,
  has,
  lens,
  lensPath,
  merge,
  pipe,
  prepend,
  prop,
  set,
  view,
} from 'ramda';

const initialState = {
  livestate: {},
  eventHistory: [],
};

const eHstLens = lens(prop('eventHistory'), assoc('eventHistory'));

const reducer = (
  state: SmartHomeState = initialState,
  action: Action
): SmartHomeState => {
  switch (action.type) {
    case 'PROCESS_EVENT': {
      const { event }: { event: BusEvent } = action;

      const newState = pipe(
        view(eHstLens),
        prepend(event),
        set(eHstLens, __, state)
      )(state);

      const { dest, value, action: eventAct } = event;

      /* Livestate is only affected if address is present and is a mutating action */
      if (
        !has(dest, state.livestate) ||
        !eventAct.match(/^(write|response)$/)
      ) {
        /* Return only updated event-history */
        return newState;
      }

      /* Also update livestate with new address-value */
      const address = newState.livestate[dest];
      const addrValLens = lensPath(['livestate', dest]);

      return set(
        addrValLens,
        merge(address, { value, updatedAt: Date.now() }),
        newState
      );
    }

    case 'REQUEST_INITIAL_STATE_SUCCESS': {
      return assoc('livestate', action.livestate, state);
    }

    default:
      return state;
  }
};

export default reducer;
