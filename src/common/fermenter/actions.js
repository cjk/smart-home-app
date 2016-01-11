export const CLEAR_ALL = 'CLEAR_ALL';
export const FETCH_FERMENTER_STATE_START = 'FETCH_FERMENTER_STATE_START';
export const FETCH_FERMENTER_STATE_SUCCESS = 'FETCH_FERMENTER_STATE_SUCCESS';

export function clearAll() {
  return {
    type: CLEAR_ALL
  };
}

export function fetchState(/* {location, params} */) {
  // We can use location and params to create custom endpoint.
  return ({fetchFermenterState}) => ({
    type: 'FETCH_FERMENTER_STATE',
    payload: {
      promise: fetchFermenterState()
    }
  });
}

export function fetchHistory() {
  // We can use location and params to create custom endpoint.
  return ({fetchFromFermenter}) => ({
    type: 'FETCH_FERMENTER_STATE',
    payload: {
      promise: fetchFromFermenter()
    }
  });
}
