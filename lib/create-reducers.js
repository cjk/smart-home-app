// @flow
import { combineReducers } from 'redux';

import app from './app/reducer';
import smartHome from './home/reducer';

export default () =>
  combineReducers({
    smartHome,
    app,
  });
