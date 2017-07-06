// @flow
import { combineReducers } from 'redux';

import app from './app/reducer';
import smartHome from './home/reducer';
import fermenter from './fermenter/reducer';

export default () =>
  combineReducers({
    app,
    smartHome,
    fermenter,
  });
