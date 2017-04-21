/* @flow */

import type {
  Action,
  BusEvent,
  CronJob,
  Deps,
  KnxAddress,
  SmartHomeState,
} from '../types';
import { assoc } from 'ramda';
import { Observable } from 'rxjs/Observable';

export const requestInitialStateSuccess = (
  smartHomeState: SmartHomeState
): Action => ({
  type: 'REQUEST_INITIAL_STATE_SUCCESS',
  payload: smartHomeState,
});

export const processEvent = (event: BusEvent) => ({
  getUid,
}: Function): Action => {
  const newEvent = assoc('id', getUid(), event);
  return {
    type: 'PROCESS_EVENT',
    payload: { newEvent },
  };
};

export const toggleShowOnlyActive = (value: boolean): Action => ({
  type: 'TOGGLE_SHOW_ONLY_ACTIVE',
  payload: !value,
});

export const createCronjob = (job: CronJob): Action => ({
  type: 'CREATE_CRONJOB',
  payload: job,
});

export const writeGroupAddr = (addr: KnxAddress): Action => ({
  type: 'WRITE_GROUP_ADDRESS',
  payload: { addr },
});

export const writeGroupAddrDone = () => ({
  type: 'WRITE_GROUP_ADDRESS_DONE',
});

const writeGroupAddrEpic = (action$: any, { homeConnect }: Deps) =>
  action$.ofType('WRITE_GROUP_ADDRESS').switchMap(action => {
    const { addr } = action.payload;
    const client = homeConnect().client;
    client.event.emit('knx/writeGroupAddr', addr);
    return Observable.of(writeGroupAddrDone);
  });

const createCronjobEpic = (action$: any, { homeConnect }: Deps) =>
  action$.ofType('CREATE_CRONJOB').switchMap(action => {
    console.log(`Creating cronjob from ${action.payload}`);
    const j = action.payload;
    const client = homeConnect().client;
    const cronjobLst = client.record.getList('smartHome/cronjobs');

    cronjobLst.whenReady(lst => {
      const newJobRecord = client.record.getRecord(j.jobId);
      newJobRecord.whenReady(record => {
        record.set(j);
        lst.addEntry(j.jobId);
        console.log(`[HomeActions] Record set to ${JSON.stringify(j)} `);
      });
    });

    return Observable.of();
  });

export const epics = [writeGroupAddrEpic, createCronjobEpic];
