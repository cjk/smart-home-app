import Addr from '../groupaddresses/address';
import {Record, List} from 'immutable';
import {actions} from '../groupaddresses/actions';

// Records are good. https://facebook.github.io/immutable-js/docs/#/Record
const initialState = new (Record({
  livestate: new List([
    {id: '1/1/7', name: 'Licht-Decke-Keller-3', type: 'DPT1', value: undefined},
    {id: '10/0/10', name: 'Kontakt-Fenster-Keller-2', type: 'DPT1', value: undefined},
  ]),
}));

const revive = state => initialState.merge({
  livestate: state.get('livestate').map(addr => new Addr(addr))
});

export default function(state = initialState, action, payload) {
  if (!action) return revive(state);

  switch (action) {

  case actions.setInitialState:
    const newState = new (Record({
      livestate: new List(payload.map(addr => new Addr(addr)))
    }));
    return newState;

  case actions.updateValue:
    const event = payload,
          addrId = event.dest,
          newVal = event.value,
          addr = state.livestate.find(addr => addr.get('id') === addrId);

    console.log('Updating state for address / value: ', JSON.stringify(addr), newVal);

    if (event.action.match(/^(write|response)$/) && addr) {
      return state
        .update('livestate', list => list.set(list.indexOf(addr), addr.set('value', newVal)));
    }
  }

  return state;
}
