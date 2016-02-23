import * as authActions from '../auth/actions';
import {firebaseActions} from '../lib/redux-firebase';
import {processEvent} from '../../common/home/actions';

export const ON_APP_COMPONENT_DID_MOUNT = 'ON_APP_COMPONENT_DID_MOUNT';

export function onAppComponentDidMount() {
  // Who injected dispatch? Check configureStore.js injectMiddleware.
  return ({dispatch, setupEventlistener}) => {
    /* Create a bound action creator (see
       http://redux.js.org/docs/basics/Actions.html) and send it to our
       smartHome-event handler */
    const boundProcessEvent = (event) => dispatch(processEvent(event));
    setupEventlistener(boundProcessEvent);

    /* for Firebase-related login (by Este) */
    dispatch(firebaseActions.watchAuth(authActions.logout));

    return {
      type: ON_APP_COMPONENT_DID_MOUNT
    };
  };
}
