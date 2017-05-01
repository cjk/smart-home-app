/* @flow */
import type { Deps } from '../types';
import type { Action, EnvLimits, FermenterState } from './types';
import { Observable } from 'rxjs/Observable';
import { merge } from 'ramda';

export const sendFermenterCmd = (cmd: string): Action => ({
  type: 'SEND_FERMENTER_CMD',
  payload: { currentCmd: cmd },
});

export const sendFermenterTempLimits = (limits: EnvLimits): Action => ({
  type: 'SEND_FERMENTER_TEMPLIMITS',
  payload: { tempLimits: limits },
});

export const processState = (newState: FermenterState): Action => ({
  type: 'PROCESS_STATE',
  payload: { newState },
});

export const subscribeToState = (): Action => ({
  type: 'SUBSCRIBE_TO_STATE',
});

export const unsubscribeToState = (): Action => ({
  type: 'UNSUBSCRIBE_TO_STATE',
});

const subscribeToStateEpic = (action$: any, { homeConnect }: Deps) =>
  action$.ofType('SUBSCRIBE_TO_STATE').switchMap(() =>
    homeConnect()
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

const sendFermenterCmdsEpic = (action$: any, { homeConnect }: Deps) =>
  action$
    .ofType('SEND_FERMENTER_CMD', 'SEND_FERMENTER_TEMPLIMITS')
    .switchMap(action =>
      homeConnect()
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

export const epics = [sendFermenterCmdsEpic, subscribeToStateEpic];
