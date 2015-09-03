import Addr from '../groupaddresses/address';
import {Record, Map} from 'immutable';
import {actions} from '../groupaddresses/actions';

// Records are good. https://facebook.github.io/immutable-js/docs/#/Record
const initialState = new (Record({
  livestate: new Map({
    '1/1/7'  : {id: '1/1/7', name: 'Licht-Decke-Keller-3', type: 'DPT1'},
    '10/0/10': {id: '10/0/10', name: 'Kontakt-Fenster-Keller-2', type: 'DPT1'},
  }),
}));

const revive = state => initialState.merge({
  livestate: state.get('livestate').map(addr => new Addr(addr))
});

export default function(state = initialState, action, payload) {
  if (!action) return revive(state);

  console.log('livestate: ', JSON.stringify(state.get('livestate')));

  switch (action) {

  case actions.updateValue:
    const event = payload,
      addrId = event.dest,
      newVal = event.value,
      addr = state.get('livestate').get(addrId);

    if (event.action.match(/^(write|response)$/) && addr) {
      return state
        .update('livestate', map => map.set(addrId, addr.set('state', newVal)));
    }

  }

  return state;
}
