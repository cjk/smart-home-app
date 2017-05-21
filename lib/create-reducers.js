// @flow
import type { Reducers } from '../types';
import { combineReducers } from 'redux';

import app from './app/reducers';

export default (platformReducers: Reducers) =>
  combineReducers({
    ...platformReducers,
    app,
  });
