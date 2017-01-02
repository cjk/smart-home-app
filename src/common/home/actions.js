/* @flow */
import type { Action, BusEvent, Deps, KnxAddress, SmartHomeState } from '../types';
import R from 'ramda';
import { Observable } from 'rxjs/Observable';

export const writeGroupAddr = (addr: KnxAddress): Action => ({
  type: 'WRITE_GROUP_ADDRESS',
  payload: { addr },
});

export const writeGroupAddrDone = () => ({
  type: 'WRITE_GROUP_ADDRESS_DONE',
});

export const requestInitialState = () => ({
  type: 'REQUEST_INITIAL_STATE',
});

export const requestInitialStateSuccess = (smartHomeState: SmartHomeState): Action => ({
  type: 'REQUEST_INITIAL_STATE_SUCCESS',
  payload: smartHomeState,
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

/* SmartHome-Epics */

const requestInitialStateEpic = (action$: any, { fetchInitialState }: Deps) =>
  action$
    .filter((action: Action) => action.type === 'REQUEST_INITIAL_STATE') /* aka action$.ofType(REQUEST_INITIAL_STATE) */
    .mergeMap(() => (
      Observable.from(fetchInitialState())
                .map(requestInitialStateSuccess)
    ));

const writeGroupAddrEpic = (action$: any, { writeGroupAddr }: Deps) =>
  action$
    .filter((action: Action) => action.type === 'WRITE_GROUP_ADDRESS') /* aka action$.ofType(WRITE_GROUP_ADDRESS) */
    .mergeMap((action) => {
      const { addr } = action.payload;
      return Observable.from(writeGroupAddr(addr))
                       .map(writeGroupAddrDone);
    });

export const epics = [
  requestInitialStateEpic,
  writeGroupAddrEpic,
];
