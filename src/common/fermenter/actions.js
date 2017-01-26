/* @flow */
import type { Deps } from '../types';
import type { Action, FermenterState } from './types';
import { Observable } from 'rxjs/Observable';

export const sendFermenterCmd = (cmd: string): Action => ({
  type: 'SEND_FERMENTER_CMD',
  payload: { cmd },
});

export const sendFermenterCmdSuccess = () => ({
  type: 'SEND_FERMENTER_CMD_SUCCESS',
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
  action$
    .ofType('SUBSCRIBE_TO_STATE')
    .switchMap(() => homeConnect()
      .connOpen()
      .switchMap(client =>
        Observable.create((observer) => {
          const rsState = client.record.getRecord('fermenter/state');
          const onState = newState => observer.next(newState);
          rsState.subscribe(onState);

          return () => {
            rsState.unsubscribe(onState);
          };
        }).takeUntil(action$.filter((action: Action) =>
          (action.type === 'UNSUBSCRIBE_TO_STATE' || action.type === 'APP_STOP')))
      )
      .switchMap(newState =>
        Observable.of(processState(newState))
      )
    );

const sendFermenterCmdEpic = (action$: any, { homeConnect }: Deps) =>
  action$
    .ofType('SEND_FERMENTER_CMD')
    .switchMap(action => (
      homeConnect()
        .connOpen()
        .switchMap((client) => {
          const cmdRecord = client.record.getRecord('fermenter/command');
          const rsReady = Observable.bindCallback(cb => (
            cmdRecord.whenReady(cb)
          ));
          return rsReady();
        })
        .switchMap((rs) => {
          rs.set('fermenter/command', action.payload.cmd);
          return Observable.of();
        })
    ));

export const epics = [
  sendFermenterCmdEpic,
  subscribeToStateEpic,
];
