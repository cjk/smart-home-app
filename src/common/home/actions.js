export const WRITE_GROUP_ADDRESS = 'WRITE_GROUP_ADDRESS';
export const REQUEST_INITIAL_STATE = 'REQUEST_INITIAL_STATE';
export const ADD_TO_EVENTHISTORY = 'ADD_TO_EVENTHISTORY';

export function writeGroupAddr(addr) {
  return {
    type: WRITE_GROUP_ADDRESS,
    payload: {addr}
  };
}

export function requestInitialState() {
  return {
    type: REQUEST_INITIAL_STATE
  };
}

export function addToEventhistory(event) {
  return {
    type: ADD_TO_EVENTHISTORY,
    payload: {event}
  };
}
