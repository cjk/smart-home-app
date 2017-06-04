/* @flow */
import type { Action, Dependencies } from '../../types';
import { processEvent, requestInitialStateSuccess } from './actions';

import { Observable } from 'rxjs/Observable';
import {
  createInitialstateReq$,
  createBusEventSub$,
} from '../shared/create-state-streams';

export const writeGroupAddrEpic = (
  action$: any,
  { connectClient }: Dependencies
) =>
  action$.ofType('WRITE_GROUP_ADDRESS').switchMap(action => {
    const { addr } = action.payload;
    const client = connectClient().client;
    client.event.emit('knx/writeGroupAddr', addr);
    return Observable.of({ type: 'WRITE_GROUP_ADDRESS_DONE' });
  });

export const createCronjobEpic = (
  action$: any,
  { connectClient }: Dependencies
) =>
  action$.ofType('CREATE_CRONJOB').switchMap(action => {
    console.log(`Creating cronjob from ${action.payload}`);
    const j = action.payload;
    const client = connectClient().client;
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

export const clientConnectEpic = (action$: any, deps: Dependencies) => {
  const { connectClient } = deps;

  /* Request initial bus-state from peer / backend */
  const deepstream$ = connectClient().connOpen().switchMap(client =>
    createInitialstateReq$(client).map(requestInitialStateSuccess).merge(
      /* TODO: Should subscribes only occur in browser-env?! */
      createBusEventSub$(client).map(processEvent)
    )
  );

  const streams: Array<any> = [deepstream$];

  return action$
    .filter((action: Action) => action.type === 'CONNECT_CLIENT')
    .mergeMap(() => Observable.merge(...streams));
};
