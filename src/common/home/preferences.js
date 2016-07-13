import { List } from 'immutable';
import { Record } from '../transit';

export default Record({
  rooms: new List(),
}, 'prefs');
