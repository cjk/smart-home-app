import * as actions from './actions';
import Addr from './address';
import {List, Record} from 'immutable';

const InitialState = Record({
  livestate: List([
    {id: '1/1/7', name: 'Licht-Decke-Keller-3', type: 'DPT1', value: undefined},
    {id: '10/0/10', name: 'Kontakt-Fenster-Keller-2', type: 'DPT1', value: undefined},
  ]),
  eventHistory: List([]),
});

const initialState = new InitialState;

// Note how JSON from server is revived to immutable record.
const revive = ({livestate, eventHistory}) => initialState.merge({
  livestate: livestate.map(addr => new Addr(addr)),
  eventHistory: eventHistory
});

export default function connectHomeReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);

  switch (action.type) {

    case actions.PROCESS_EVENT: {
      const {newEvent} = action.payload;

      /* Update event-history and/or livestate */
      const newState = state
                  .update('eventHistory', list => list.push(newEvent));

      if (newEvent.action.match(/^(write|response)$/)) {
        return newState
                  .set('livestate', updateAddrValue(state.livestate, newEvent.dest, newEvent.value));
      }
      return newState;
    }

    case actions.REQUEST_INITIAL_STATE_START: {
      /* Currently no state change on this event */
      return state;
    }

    case actions.REQUEST_INITIAL_STATE_SUCCESS: {
      const livestate = List(action.payload).map(addr => new Addr(addr));

      return state.set('livestate', livestate);
    }

    case actions.WRITE_GROUP_ADDRESS_START: {
      /* Currently no state change on this event */
      return state;
    }

    case actions.WRITE_GROUP_ADDRESS_SUCCESS: {
      /* Currently no state change on this event */
      return state;
    }

  }

  return state;
}

function updateAddrValue(state, id, value) {
  const addr = state.find(addr => addr.id === id);
  if (!addr)
    return state;
  return state.update(list => list.set(list.indexOf(addr), addr.set('value', value)));
}
