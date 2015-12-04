export const PROCESS_EVENT = 'PROCESS_EVENT';
export const REQUEST_INITIAL_STATE_ERROR = 'REQUEST_INITIAL_STATE_ERROR';
export const REQUEST_INITIAL_STATE_START = 'REQUEST_INITIAL_STATE_START';
export const REQUEST_INITIAL_STATE_SUCCESS = 'REQUEST_INITIAL_STATE_SUCCESS';
export const WRITE_GROUP_ADDRESS = 'WRITE_GROUP_ADDRESS';

export function writeGroupAddr(addr) {
  return {
    type: WRITE_GROUP_ADDRESS,
    payload: {addr}
  };
}

export function requestInitialState({location, params}) {
  /* The function returned here get's passed `dispatch` and `getState` as
  parameters along with all the middleware-functions (in this case: `fetch` and
  `validate`): */
  return ({fetchInitialState}) => ({
    type: 'REQUEST_INITIAL_STATE',
    payload: {
      // We could use location and params to create custom endpoint.
      promise: fetchInitialState()
    }
  });

}

export function processEvent(event) {
  return {
    type: PROCESS_EVENT,
    payload: {event}
  };
}
