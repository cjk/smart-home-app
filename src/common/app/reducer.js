import {combineReducers} from 'redux';
/* MERGE-TODO */
import {reduxFields} from '../lib/redux-fields';

import auth from '../auth/reducer';
import device from '../device/reducer';
import intl from '../intl/reducer';
import smartHome from '../home/reducer';
import fermenter from '../fermenter/reducer';
import ui from '../ui/reducer';
import users from '../users/reducer';

const appReducer = combineReducers({
  auth,
  device,
  intl,
  smartHome,
  fermenter,
  //reduxFields,
  ui,
  users
});

export default appReducer;
