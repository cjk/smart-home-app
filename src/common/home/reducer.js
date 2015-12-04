import * as actions from './actions';
import Addr from './address';
import getRandomString from '../lib/getRandomString';
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

    case actions.WRITE_GROUP_ADDRESS: {
      const {addr} = action.payload;
      console.log('### HOME-REDUCER: WRITE_GROUP_ADDRESS:', addr.toJS());
      /*       connector.writeGroupAddr(addr); */
      return state;
    }

    case actions.PROCESS_EVENT: {
      const {event} = action.payload;

      console.log('### HOME-REDUCER: PROCESS_EVENT:', event.toJS());

      const newEvent = event.merge({
        id: getRandomString()
      });

      /* Update event-history AND livestate */
      return state
                  .update('eventHistory', list => list.push(newEvent))
                  .set('livestate', updateAddrValue(state.livestate, event.dest, event.value));
    }

    case actions.REQUEST_INITIAL_STATE_START: {
      console.log('### HOME-REDUCER: REQUEST_INITIAL_STATE_START:');
      return state;
    }

    case actions.REQUEST_INITIAL_STATE_SUCCESS: {
      console.log('### HOME-REDUCER: REQUEST_INITIAL_STATE_SUCCESS:', action.payload);
      const livestate = List(action.payload);

      return state.set('livestate', livestate);
    }

  }

  return state;
}

function updateAddrValue(state, id, value) {
  const addr = state.find(addr => addr.get('id') === id);
  if (!addr)
    return state;
  return state.update(list => list.set(list.indexOf(addr), addr.set('value', value)));
}
