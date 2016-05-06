import * as actions from './actions';
import FermenterState, { Env } from './fermenterState';
import { Map } from 'immutable';

const initialState = FermenterState;

// Note how JSON from server is revived to immutable record.
const revive = (state) => initialState.mergeDeep(state);

export default function fermenterReducer(state = initialState, action) {
  //console.log(`~~~ InitialState RAW: ${state}`);
  //console.log(`~~~ InitialState: ${JSON.stringify(state)}`);
  if (!(Map.isMap(state))) return revive(state);

  switch (action.type) {

    case actions.PROCESS_STATE: {
      const newState = action.payload.fermenterState;

      /* fermenter state is not available */
      if (!newState) {
        return newState;
      }
      return revive(newState);
    }
  }

  return state;
}
