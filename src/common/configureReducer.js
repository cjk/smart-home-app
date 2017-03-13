/* @flow weak */
import app from './app/reducer';
import config from './config/reducer';
import device from './device/reducer';
import smartHome from './home/reducer';
import fermenter from './fermenter/reducer';
import intl from './intl/reducer';
import themes from './themes/reducer';
import { combineReducers } from 'redux';

const configureReducer = (platformReducers: Object, initialState: Object) =>
  combineReducers({
    ...platformReducers,
    app,
    config,
    device,
    intl,
    themes,
    smartHome,
    fermenter,
  });

export default configureReducer;
