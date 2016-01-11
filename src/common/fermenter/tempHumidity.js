import {Record} from 'immutable';

export default Record({
  createdAt: Date.now(),
  temperature: 0,
  humidity: 0,
  isValid: false,
  errors: 0
});
