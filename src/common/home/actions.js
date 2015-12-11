export const PROCESS_EVENT = 'PROCESS_EVENT';

export const REQUEST_INITIAL_STATE_START = 'REQUEST_INITIAL_STATE_START';
export const REQUEST_INITIAL_STATE_SUCCESS = 'REQUEST_INITIAL_STATE_SUCCESS';
export const REQUEST_INITIAL_STATE_ERROR = 'REQUEST_INITIAL_STATE_ERROR';

export const WRITE_GROUP_ADDRESS_START = 'WRITE_GROUP_ADDRESS_START';
export const WRITE_GROUP_ADDRESS_SUCCESS = 'WRITE_GROUP_ADDRESS_SUCCESS';
export const WRITE_GROUP_ADDRESS_ERROR = 'WRITE_GROUP_ADDRESS_ERROR';

export function writeGroupAddr(addr) {
  return ({writeGroupAddr}) => ({
    type: 'WRITE_GROUP_ADDRESS',
    payload: {
      promise: writeGroupAddr(addr)
    }
  });
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
  return ({getUid, now}) => {
    const newEvent = event.merge({
      id: getUid()
    });

    return {
      type: PROCESS_EVENT,
      payload: {newEvent}
    };
  };
}
