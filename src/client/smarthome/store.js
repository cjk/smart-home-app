import Event from './event';
import {Record} from 'immutable';
import {actions} from './actions';

// Records are good. https://facebook.github.io/immutable-js/docs/#/Record
const initialState = new (Record({
  list: [],
}));

const revive = state => initialState.merge({
  list: state.get('list').map(event => new Event(event))
});

export default function(state = initialState, action, payload) {
  if (!action) return revive(state);

  switch (action) {

  case actions.clearAll:
    return state
      .update('list', list => list.clear());

  }

  return state;
}
