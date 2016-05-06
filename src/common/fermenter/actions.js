export const CLEAR_ALL = 'CLEAR_ALL';
export const PROCESS_STATE = 'PROCESS_STATE';
export const FETCH_HISTORY = 'FETCH_HISTORY';
export const FERMENTER_START = 'FERMENTER_START';
export const FERMENTER_STOP = 'FERMENTER_STOP';

export function clearAll() {
  return {
    type: CLEAR_ALL
  };
}

export function fermenterStart() {
  console.log(`~~~ Sending START-fermenter-command`);

  return ({ sendFermenterCommand }) => ({
    type: 'FERMENTER_START',
    payload: {
      promise: sendFermenterCommand('fermenterStart')
    }
  });
}

export function fermenterStop() {
  console.log(`~~~ Sending STOP-fermenter-command`);

  return ({ sendFermenterCommand }) => ({
    type: 'FERMENTER_STOP',
    payload: {
      promise: sendFermenterCommand('fermenterStop')
    }
  });
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
