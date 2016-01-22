import {Record} from 'immutable';

export default Record({
  createdAt: null,
  temperature: null,
  humidity: null,
  isValid: false,
  errors: 0,
  heaterIsRunning: null,
  humidifierIsRunning: null
});
