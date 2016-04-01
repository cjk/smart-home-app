export const CLEAR_ALL = 'CLEAR_ALL';
export const FETCH_FERMENTER_STATE_START = 'FETCH_FERMENTER_STATE_START';
export const FETCH_FERMENTER_STATE_ERROR = 'FETCH_FERMENTER_STATE_ERROR';
export const FETCH_FERMENTER_STATE_SUCCESS = 'FETCH_FERMENTER_STATE_SUCCESS';

export function clearAll() {
  return {
    type: CLEAR_ALL
  };
}

export function fetchState(/* {location, params} */) {
  return ({ fetchFermenterState }) => ({
    type: 'FETCH_FERMENTER_STATE',
    payload: {
      promise: fetchFermenterState()
    }
  });
}

export function fetchHistory() {
  return ({ fetchFermenterHistory }) => ({
    type: 'FETCH_FERMENTER_STATE',
    payload: {
      promise: fetchFermenterHistory()
    }
  });
}
