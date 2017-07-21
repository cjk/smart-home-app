import type { Action, AppState } from '../../types';

import { assoc, lensPath, set } from 'ramda';

const initialState: AppState = {
  rooms: {
    'hall-1': { name: 'Flur EG', story: 'EG' },
    'hall-2': { name: 'Flur OG', story: 'OG' },
    'hall-3': { name: 'Flur DG', story: 'DG' },
    hby: { name: 'Hobby', story: 'UG' },
    'cel-1': { name: 'Heizraum', story: 'UG' },
    'cel-2': { name: 'Keller-2', story: 'UG' },
    'cel-3': { name: 'Keller-3', story: 'UG' },
    tec: { name: 'Technik', story: 'EG' },
    kit: { name: 'Küche', story: 'EG' },
    office: { name: 'Büro', story: 'EG' },
    wz: { name: 'Wohnzimmer', story: 'EG' },
    ez: { name: 'Essen', story: 'EG' },
    'knd-1': { name: 'Schlafen', story: 'OG' },
    'knd-2': { name: 'Kind-2', story: 'OG' },
    'knd-3': { name: 'Kind-3', story: 'OG' },
    bath: { name: 'Bad', story: 'OG' },
    rest: { name: 'WC', story: 'EG' },
    outer: { name: 'Außenbereich', story: 'EG' },
  },
  prefs: {
    rooms: [
      'hall-1',
      'hall-2',
      'hby',
      'wz',
      'ez',
      'kit',
      'knd-1',
      'knd-2',
      'knd-3',
      'cel-1',
      'cel-2',
      'cel-3',
      'office',
      'rest',
      'bath',
      'tec',
      'outer',
    ],
    showOnlyActive: false,
  },
  isSubscribedToBus: false,
};

const reducer = (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
    case 'SUBSCRIBE_TO_BUS_SUCCESS': {
      return assoc('isSubscribedToBus', true, state);
    }

    case 'TOGGLE_SHOW_ONLY_ACTIVE': {
      const valueLens = lensPath(['prefs', 'showOnlyActive']);
      const newValue = action.toggleValue;

      return set(valueLens, newValue, state);
    }

    default:
      return state;
  }
};

export default reducer;
