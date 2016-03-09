import { combineReducers } from 'redux';
import { reduxFields } from '../lib/redux-fields';
import { routerReducer as routing } from 'react-router-redux';

import auth from '../auth/reducer';
import config from '../config/reducer';
import device from '../device/reducer';
import intl from '../intl/reducer';
import smartHome from '../home/reducer';
import fermenter from '../fermenter/reducer';
import ui from '../ui/reducer';
import users from '../users/reducer';

const appReducer = combineReducers({
  auth,
  config,
  device,
  intl,
  smartHome,
  fermenter,
  reduxFields,
  routing,
  ui,
  users
});

export default appReducer;
