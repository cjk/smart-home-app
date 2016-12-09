/* @flow */
import type { Action, KnxAddress, BusEvent } from '../types';
import R from 'ramda';

export const writeGroupAddr = (addr: KnxAddress) => ({ writeGroupAddr }: Function): Action => ({
  type: 'WRITE_GROUP_ADDRESS',
  payload: writeGroupAddr(addr),  /* MERGE-TODO: ASYNC! */
});

export const requestInitialState = () => ({ fetchInitialState }: Function): Action => ({
  type: 'REQUEST_INITIAL_STATE',
  payload: fetchInitialState(), /* MERGE-TODO: ASYNC! */
});

export const processEvent = (event: BusEvent) => ({ getUid }: Function): Action => {
  const newEvent = R.assoc('id', getUid(), event);

  return {
    type: 'PROCESS_EVENT',
    payload: { newEvent }
  };
};

export const switchToTab = (tabId: number): Action => ({
  type: 'SWITCH_TO_TAB',
  payload: { tabId }
});
