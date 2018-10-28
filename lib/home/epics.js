/* @flow */

import type { Action, Dependencies } from '../../types'

// import logger from 'debug'

import { of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { compose, find, identity, map, path, pipe, prop, propEq } from 'ramda'
import { buildCronjobWithTasks, invertTaskActions, scheduleJobForNow } from '../../lib/shared/cronjob-utils'
import { getEntriesFromRecordList } from '../../lib/shared/deepstream-utils'

// const debug = logger('smtApp:home-epic')

export const writeGroupAddrEpic = (action$: any, { client }: Dependencies) =>
  action$.pipe(
    ofType('WRITE_GROUP_ADDRESS'),
    switchMap(action => {
      const { addr } = action
      client.event.emit('knx/writeGroupAddr', addr)
      return of({ type: 'WRITE_GROUP_ADDRESS_DONE' })
    })
  )

export const fetchCronjobs = (action$: any, { client }: Dependencies) =>
  action$.pipe(
    ofType('FETCH_CRONJOBS'),
    switchMap(() =>
      /* action */ getEntriesFromRecordList(client, 'cronjobs').switchMap(recordArray =>
        of(
          ({
            type: 'FETCH_CRONJOBS_SUCCESS',
            cronjobs: map(r => r.get())(recordArray),
          }: Action)
        )
      )
    )
  )

export const fetchScenes = (action$: any, { client }: Dependencies) =>
  action$.pipe(
    ofType('FETCH_SCENES'),
    switchMap(() =>
      /* action */ getEntriesFromRecordList(client, 'scenes').pipe(
        switchMap(recordArray =>
          of(
            ({
              type: 'FETCH_SCENES_SUCCESS',
              scenes: map(r => r.get())(recordArray),
            }: Action)
          )
        )
      )
    )
  )

export const sceneActivate = (action$: any, { getState }: Dependencies) =>
  action$.pipe(
    ofType('SCENE_ACTIVATE'),
    switchMap(action => {
      const { sceneId, activate } = action
      const sceneTasks = pipe(
        path(['smartHome', 'scenes']),
        find(propEq('id', sceneId)),
        prop('tasks'),
        activate ? identity : invertTaskActions
      )(getState())

      return of({
        type: 'SCHEDULE_CRONJOB',
        job: compose(
          scheduleJobForNow,
          buildCronjobWithTasks
        )(sceneId, sceneTasks),
      })
    })
  )

export const scheduleJob = (action$: any, { client }: Dependencies) =>
  action$.pipe(
    ofType('SCHEDULE_CRONJOB'),
    switchMap(action => {
      const { job } = action

      const cronjobLst = client.record.getList('smartHome/cronjobs')

      cronjobLst.whenReady(lst => {
        const newJob = client.record.getRecord(job.jobId)
        newJob.whenReady(record => {
          record.set(job)
          lst.addEntry(job.jobId)
        })
      })

      return of()
    })
  )
