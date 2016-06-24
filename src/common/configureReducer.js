import app from './app/reducer';
import auth from './auth/reducer';
import config from './config/reducer';
import device from './device/reducer';
import smartHome from './home/reducer';
import fermenter from './fermenter/reducer';
import intl from './intl/reducer';
import todos from './todos/reducer';
import ui from './ui/reducer';
import users from './users/reducer';
import { LOGOUT } from './auth/actions';
import { combineReducers } from 'redux';
import { fieldsReducer as fields } from './lib/redux-fields';
import { firebaseReducer as firebase } from './lib/redux-firebase';
import { routerReducer as routing } from 'react-router-redux';
import { updateStateOnStorageLoad } from './configureStorage';

const resetStateOnLogout = (reducer, initialState) => (state, action) => {
  // Reset app state on logout, stackoverflow.com/q/35622588/233902.
  if (action.type === LOGOUT) {
    // Delete whole app state except some fixtures and routing state.
    state = {
      device: initialState.device,
      intl: initialState.intl,
      routing: state.routing // Note routing state has to be reused.
    };
  }
  return reducer(state, action);
};

export default function configureReducer(initialState, platformReducers) {
  let reducer = combineReducers({
    ...platformReducers,
    app,
    auth,
    config,
    device,
    fields,
    firebase,
    intl,
    routing,
    smartHome,
    fermenter,
    todos,
    ui,
    users,
  });

  // The power of higher-order reducers, http://slides.com/omnidan/hor
  reducer = resetStateOnLogout(reducer, initialState);
  reducer = updateStateOnStorageLoad(reducer);

  return reducer;
}
