/* @flow */
import type { Action$, Dependencies } from '../../types';
import type { Action } from '../../types/fermenter';
import { Observable } from 'rxjs/Observable';
import { prop } from 'ramda';
import { processState } from './actions';

export const subscribeToStateEpic = (
  action$: Action$,
  { connectClient }: Dependencies
) =>
  action$.ofType('SUBSCRIBE_TO_STATE').switchMap(() =>
    connectClient()
      .connOpen()
      .switchMap(client =>
        Observable.create(observer => {
          const rsState = client.record.getRecord('fermenter/state');
          const onState = newState => observer.next(newState);
          rsState.subscribe(onState);

          return () => {
            rsState.unsubscribe(onState);
          };
        }).takeUntil(
          action$.filter(
            (action: Action) => action.type === 'UNSUBSCRIBE_TO_STATE'
          )
        )
      )
      .switchMap(newState => Observable.of(processState(newState)))
  );

export const sendFermenterCmdsEpic = (
  action$: Action$,
  { connectClient }: Dependencies
) =>
  action$
    .ofType('SEND_FERMENTER_CMD', 'SEND_FERMENTER_TEMPLIMITS')
    .switchMap(action =>
      connectClient()
        .connOpen()
        .switchMap(client => {
          const cmdRecord = client.record.getRecord('fermenter/commands');
          const rsReady = Observable.bindCallback(cb =>
            cmdRecord.whenReady(cb)
          );
          return rsReady();
        })
        .switchMap(rs => {
          rs.set('currentCmd', prop('currentCmd', action));
          return Observable.of();
        })
    );
