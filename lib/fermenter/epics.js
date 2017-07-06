/* @flow */
import type { Action$, Dependencies } from '../../types';
import type { Action, EnvLimits, FermenterState } from '../../types/fermenter';
import { Observable } from 'rxjs/Observable';
import { merge } from 'ramda';

const sendFermenterCmd = (cmd: string): Action => ({
  type: 'SEND_FERMENTER_CMD',
  currentCmd: cmd,
});

const sendFermenterTempLimits = (limits: EnvLimits): Action => ({
  type: 'SEND_FERMENTER_TEMPLIMITS',
  tempLimits: limits,
});

const processState = (newState: FermenterState): Action => ({
  type: 'PROCESS_STATE',
  newState,
});

const subscribeToState = (): Action => ({
  type: 'SUBSCRIBE_TO_STATE',
});

const unsubscribeToState = (): Action => ({
  type: 'UNSUBSCRIBE_TO_STATE',
});

export const subscribeToStateEpic = (action$: Action$, { connectClient }: Dependencies) =>
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
            (action: Action) =>
              action.type === 'UNSUBSCRIBE_TO_STATE' ||
              action.type === 'APP_STOP'
          )
        )
      )
      .switchMap(newState => Observable.of(processState(newState)))
  );

export const sendFermenterCmdsEpic = (action$: Action$, { connectClient }: Dependencies) =>
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
          const currentCmds = rs.get();
          rs.set(merge(currentCmds, action.payload));
          return Observable.of();
        })
    );
