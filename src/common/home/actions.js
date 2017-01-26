/* @flow */

import type { Action, BusEvent, Deps, KnxAddress, SmartHomeState } from '../types';
import R from 'ramda';
import { Observable } from 'rxjs/Observable';

export const requestInitialStateSuccess = (smartHomeState: SmartHomeState): Action => ({
  type: 'REQUEST_INITIAL_STATE_SUCCESS',
  payload: smartHomeState,
});

export const processEvent = (event: BusEvent) => ({ getUid }: Function): Action => {
  const newEvent = R.assoc('id', getUid(), event);
  return {
    type: 'PROCESS_EVENT',
    payload: { newEvent },
  };
};

export const writeGroupAddr = (addr: KnxAddress): Action => ({
  type: 'WRITE_GROUP_ADDRESS',
  payload: { addr },
});

export const writeGroupAddrDone = () => ({
  type: 'WRITE_GROUP_ADDRESS_DONE',
});

const writeGroupAddrEpic = (action$: any, { homeConnect }: Deps) =>
  action$.ofType('WRITE_GROUP_ADDRESS')
         .switchMap((action) => {
           const { addr } = action.payload;
           const client = homeConnect().client;
           client.event.emit('knx/writeGroupAddr', addr);
           return Observable.of(writeGroupAddrDone);
         });

export const epics = [
  writeGroupAddrEpic,
];
