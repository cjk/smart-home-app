export const PROCESS_EVENT = 'PROCESS_EVENT';

export const REQUEST_INITIAL_STATE_START = 'REQUEST_INITIAL_STATE_START';
export const REQUEST_INITIAL_STATE_SUCCESS = 'REQUEST_INITIAL_STATE_SUCCESS';
export const REQUEST_INITIAL_STATE_ERROR = 'REQUEST_INITIAL_STATE_ERROR';

export const WRITE_GROUP_ADDRESS_START = 'WRITE_GROUP_ADDRESS_START';
export const WRITE_GROUP_ADDRESS_SUCCESS = 'WRITE_GROUP_ADDRESS_SUCCESS';
export const WRITE_GROUP_ADDRESS_ERROR = 'WRITE_GROUP_ADDRESS_ERROR';

export const SWITCH_TO_TAB = 'SWITCH_TO_TAB';

export function writeGroupAddr(addr) {
  return ({ writeGroupAddr }) => ({
    type: 'WRITE_GROUP_ADDRESS',
    payload: {
      promise: writeGroupAddr(addr)
    }
  });
}

export function requestInitialState(/* {location, params} */) {
  // We can use location and params to create custom endpoint.
  return ({ fetchInitialState }) => ({
    type: 'REQUEST_INITIAL_STATE',
    payload: {
      // We could use location and params to create custom endpoint.
      promise: fetchInitialState()
    }
  });
}

export function processEvent(event) {
  return ({ getUid }) => {
    const newEvent = event.merge({
      id: getUid()
    });

    return {
      type: PROCESS_EVENT,
      payload: { newEvent }
    };
  };
}

export function switchToTab(tabId) {
  return {
    type: SWITCH_TO_TAB,
    payload: { tabId }
  };
}
