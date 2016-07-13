import { Record } from '../transit';

export default Record({
  id: null,
  created: null,
  action: null,
  type: null,
  src: null,
  dest: null,
  value: null
}, 'event');
