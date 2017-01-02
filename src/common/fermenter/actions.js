/* @flow */
import type { Deps } from '../types';
import type { Action, FermenterState } from './types';
import { Observable } from 'rxjs/Observable';

export const sendFermenterCmd = (cmd: string): Action => ({
  //   return ({ sendFermenterCommand }) => ({
  type: 'SEND_FERMENTER_CMD',
  payload: { cmd },
  //   promise: sendFermenterCommand('fermenterStart')
});

export const sendFermenterCmdSuccess = () => ({
  type: 'SEND_FERMENTER_CMD_SUCCESS',
});

export const processState = (newState: FermenterState): Action => ({
  type: 'PROCESS_STATE',
  payload: { newState },
});

/* PENDING: not yet implemented */
// export const fetchHistory = (): Action => ({
//   type: 'FETCH_HISTORY',
//   //     payload: { history },
// });

const sendFermenterCmdEpic = (action$: any, { sendFermenterCmd }: Deps) =>
  action$
  .filter((action: Action) => action.type === 'SEND_FERMENTER_CMD') /* aka action$.ofType(SEND_FERMENTER_CMD) */
  .mergeMap(action => (
    Observable.from(sendFermenterCmd(action.payload.cmd))
              .map(sendFermenterCmdSuccess)
  ));

export const epics = [
  sendFermenterCmdEpic,
];
