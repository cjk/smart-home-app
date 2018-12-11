/* @flow */

import type { Action$, Dependencies } from '../../types'
import type { Action } from '../../types/fermenter'
import { Observable, of, bindCallback } from 'rxjs'
import { mergeMap, switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { merge, dissoc } from 'ramda'
import { processState } from './actions'

export const subscribeToStateEpic = (action$: Action$, { client }: Dependencies) =>
  action$.pipe(
    ofType('SUBSCRIBE_TO_STATE'),
    mergeMap(() =>
      Observable.create(observer => {
        const rsState = client.record.getRecord('fermenter/state')
        const onState = newState => observer.next(newState)
        rsState.subscribe(onState)

        return () => {
          rsState.unsubscribe(onState)
        }
      }).takeUntil(action$.filter((action: Action) => action.type === 'UNSUBSCRIBE_TO_STATE'))
    ),
    switchMap(newState => of(processState(newState)))
  )

export const sendFermenterCmdsEpic = (action$: Action$, { client }: Dependencies) =>
  action$.pipe(
    ofType('SEND_FERMENTER_CMD', 'SEND_FERMENTER_TEMPLIMITS'),
    mergeMap(action => {
      const cmdRecord = client.record.getRecord('fermenter/commands')
      return bindCallback(cb => cmdRecord.whenReady(cb))().pipe(
        switchMap(rs => {
          const currentCmds = rs.get()
          rs.set(merge(currentCmds, dissoc('type', action)))
          return of()
        })
      )
    })
  )
