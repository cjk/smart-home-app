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
const revive = ({livestate, homeConnector, eventHistory}) => initialState.merge({
  livestate: livestate.map(addr => new Addr(addr)),
  eventHistory: eventHistory
});

export default function connectHomeReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);

  switch (action.type) {

    case actions.WRITE_GROUP_ADDRESS: {
      const {addr} = action.payload;
      console.log('### REDUCER: WRITE_GROUP_ADDRESS:', addr);
      /*       connector.writeGroupAddr(addr); */
      return state;
    }

    case actions.ADD_TO_EVENTHISTORY: {
      const {event} = action.payload;

      console.log('### REDUCER: ADD_TO_EVENTHISTORY:', event);
      /* do more */
      return state;
    }

  }

  return state;
}
