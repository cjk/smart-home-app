/* @flow */
import type { Action, Dependencies } from '../../types';

import { Observable } from 'rxjs/Observable';
import { map } from 'ramda';

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
    const j = action.payload;
    const client = connectClient().client;
    const cronjobLst = client.record.getList('smartHome/cronjobs');

    cronjobLst.whenReady(lst => {
      const newJobRecord = client.record.getRecord(j.jobId);
      newJobRecord.whenReady(record => {
        record.set(j);
        lst.addEntry(j.jobId);
      });
    });

    return Observable.of();
  });

export const fetchScenes = (action$: any, { connectClient }: Dependencies) =>
  action$
    .ofType('FETCH_SCENES')
    .switchMap((/* action */) => {
      const client = connectClient().client;
      const sceneLst = client.record.getList('smartHome/scenes');

      return Observable.bindCallback(cb => sceneLst.whenReady(cb))();
    })
    .mergeMap(lst =>
      Observable.from(
        lst
          .getEntries()
          .map(e => connectClient().client.record.getRecord(e))
          .map(r => Observable.bindCallback(cb => r.whenReady(cb))())
      )
        .concatAll()
        .toArray()
        .switchMap(recordArray =>
          Observable.of(
            ({
              type: 'FETCH_SCENES_SUCCESS',
              scenes: map(r => r.get())(recordArray),
            }: Action)
          )
        )
    );
