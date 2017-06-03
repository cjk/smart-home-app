/* @flow */
import type { Action, Dependencies } from '../../types';
import { processEvent, requestInitialStateSuccess } from './actions';

import { Observable } from 'rxjs/Observable';

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

const createBusEventSubStream = client =>
  Observable.create(observer => {
    const onEvent = e => {
      observer.next(e);
    };
    console.log(
      '[appStartedDeepstreamEpic] - Subscribing to deepstream events'
    );
    client.event.subscribe('knx/event', onEvent);
    return () => {
      client.event.unsubscribe('knx/event', onEvent);
    };
  });

const createInitialstateReqStream = client =>
  Observable.create(observer => {
    console.log('[appStartedDeepstreamEpic] - Requesting initial state');
    client.record.snapshot('knx/initialBusState', (error, record) => {
      if (error) {
        console.error('Error requesting initialBusState from deepstream');
        observer.error('Error requesting initialBusState from deepstream');
      }
      observer.next(record);
      observer.complete();
    });
    /* No cleanup necessary, we only requested a snapshot above */
    return () => {};
  });

export const clientConnectEpic = (action$: any, deps: Dependencies) => {
  const { connectClient } = deps;

  /* Request initial bus-state from peer / backend */
  const deepstream$ = connectClient().connOpen().switchMap(client =>
    createInitialstateReqStream(client).map(requestInitialStateSuccess).merge(
      /* TODO: Should subscribes only occur in browser-env?! */
      createBusEventSubStream(client).map(processEvent)
    )
  );

  const streams: Array<any> = [deepstream$];

  return action$
    .filter((action: Action) => action.type === 'CONNECT_CLIENT')
    .mergeMap(() => Observable.merge(...streams));
};
