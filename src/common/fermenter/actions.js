export const CLEAR_ALL = 'CLEAR_ALL';
export const PROCESS_STATE = 'PROCESS_STATE';
export const FETCH_HISTORY = 'FETCH_HISTORY';

export function clearAll() {
  return {
    type: CLEAR_ALL
  };
}

export function processState(newState) {
  return {
    type: PROCESS_STATE,
    payload: newState
  };
}

/* TODO: not yet implemented */
export function fetchHistory() {
  return ({ fetchFermenterHistory }) => ({
    type: 'FETCH_HISTORY',
    payload: {
      promise: fetchFermenterHistory()
    }
  });
}
