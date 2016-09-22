import * as actions from './actions';
import FermenterState from './fermenterState';
import { Map } from 'immutable';

const State = FermenterState;

// TODO: Probably better to not merge here - see
// https://github.com/este/este/commit/03cebd9ad7152d5f4147bcb6e8bc023671409bac
const revive = (state) => State.mergeDeep(state);

export default function fermenterReducer(state = State, action) {
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

    default:
      return state;
  }
}
