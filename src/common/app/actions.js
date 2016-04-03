import { setCurrentLocale } from '../intl/actions';
import { processEvent } from '../../common/home/actions';

export const UPDATE_APP_STATE_FROM_STORAGE = 'UPDATE_APP_STATE_FROM_STORAGE';

export function updateAppStateFromStorage() {
  return ({ dispatch, engine }) => {
    engine.load().then(state => {
      if (state.intl && state.intl.currentLocale) {
        dispatch(setCurrentLocale(state.intl.currentLocale));
      } else if (process.env.IS_SERVERLESS) {
        // TODO: Add a reliable client side only locale detection with failback
        // to config defaultLocale.
        dispatch(setCurrentLocale('en'));
      }
    });
    return {
      type: UPDATE_APP_STATE_FROM_STORAGE
    };
  };
}

export const SUBSCRIBE_TO_BUS_EVENTS = 'SUBSCRIBE_TO_BUS_EVENTS';

export function subscribeToBusEvents() {
  // Who injected dispatch? Check configureStore.js injectMiddleware.
  return ({ dispatch, subscribeToBusEvents }) => {
    /* Create a bound action creator (see
       http://redux.js.org/docs/basics/Actions.html) and send it to our
       smartHome-event handler */
    const boundProcessEvent = (event) => dispatch(processEvent(event));
    subscribeToBusEvents(boundProcessEvent);
  };
}
