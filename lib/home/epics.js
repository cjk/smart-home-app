/* @flow */
import type { Action, Dependencies } from '../../types';

import { Observable } from 'rxjs/Observable';
import { createBusEventSub$ } from '../shared/create-state-streams';

export const writeGroupAddrEpic = (
  action$: any,
  { connectClient }: Dependencies
) =>
  action$.ofType('WRITE_GROUP_ADDRESS').switchMap(action => {
    const { addr } = action;
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

export const subscribeToBusEpic = (action$: any, deps: Dependencies) => {
  const { connectClient } = deps;
  const processEvent = event => ({ type: 'PROCESS_EVENT', event });

  /* Request initial bus-state from peer / backend */
  const deepstream$ = connectClient()
    .connOpen()
    .switchMap(client =>
      createBusEventSub$(client).map(event => processEvent(event))
    );

  // TODO: Is merging necessary if we only have one stream?
  const streams: Array<any> = [deepstream$];

  return action$
    .filter((action: Action) => action.type === 'SUBSCRIBE_TO_BUS')
    .mergeMap(() => Observable.merge(...streams));
};
