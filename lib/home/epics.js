/* @flow */
import type { Action, Dependencies } from '../../types';

import { Observable } from 'rxjs/Observable';
import { find, map, path, pipe, prop, propEq } from 'ramda';
import {
  buildCronjobWithTasks,
  scheduleJobForNow,
} from '../../lib/shared/cronjob-utils';

export const writeGroupAddrEpic = (
  action$: any,
  { connectClient }: Dependencies
) =>
  action$.ofType('WRITE_GROUP_ADDRESS').switchMap(action => {
    const { addr } = action;
    const { client } = connectClient();
    client.event.emit('knx/writeGroupAddr', addr);
    return Observable.of({ type: 'WRITE_GROUP_ADDRESS_DONE' });
  });

export const fetchScenes = (action$: any, { connectClient }: Dependencies) =>
  action$
    .ofType('FETCH_SCENES')
    .switchMap((/* action */) => {
      const { client } = connectClient();
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

export const sceneActivate = (action$: any, { getState }: Dependencies) =>
  action$.ofType('SCENE_ACTIVATE').switchMap(action => {
    const { sceneId } = action;
    console.log(`Activating scene no #${sceneId}`);

    const scene = pipe(
      path(['smartHome', 'scenes']),
      find(propEq('id', sceneId)),
      prop('tasks')
    )(getState());

    return Observable.of({
      type: 'SCHEDULE_CRONJOB',
      job: scheduleJobForNow(buildCronjobWithTasks(sceneId, scene)),
    });
  });

export const scheduleJob = (action$: any, { connectClient }: Dependencies) =>
  action$.ofType('SCHEDULE_CRONJOB').switchMap(action => {
    const { job } = action;
    const { client } = connectClient();

    console.log(job);

    // TODO: Check if scene-id already exists on joblist!
    const cronjobLst = client.record.getList('smartHome/cronjobs');

    cronjobLst.whenReady(lst => {
      const newJob = client.record.getRecord(job.jobId);
      newJob.whenReady(record => {
        record.set(job);
        lst.addEntry(job.jobId);
      });
    });

    return Observable.of();
  });
