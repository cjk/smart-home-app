// @flow
import type { Action, Dependencies } from '../../types';

import logger from 'debug';
import { Observable } from 'rxjs';
import {
  createBusEventSub$,
  createInitialstateReq$,
} from '../shared/create-state-streams';

const debug = logger('smtApp:appEpic');

export const subscribeToBusEpic = (action$: any, deps: Dependencies) => {
  const { client, getState } = deps;
  const isAlreadySubscribed = () => getState().app.isSubscribedToBus;
  const processEvent = (event): Action => ({ type: 'PROCESS_EVENT', event });

  return action$
    .filter((action: Action) => action.type === 'SUBSCRIBE_TO_BUS')
    .filter(() => !isAlreadySubscribed()) // subscribe to bus-events only once!
    .mergeMap(() =>
      createBusEventSub$(client)
        .map(event => processEvent(event))
        .startWith(({ type: 'SUBSCRIBE_TO_BUS_SUCCESS' }: Action))
    );
};

export const requestInitialState = (action$: any, deps: Dependencies) => {
  const { client } = deps;
  const requestInitialStateSuccess = (livestate): Action => ({
    type: 'REQUEST_INITIAL_STATE_SUCCESS',
    livestate,
  });

  return action$
    .filter((action: Action) => action.type === 'REQUEST_INITIAL_STATE')
    .mergeMap(() => createInitialstateReq$(client.client))
    .map(livestate => requestInitialStateSuccess(livestate));
};

export const startConnectionTracking = (
  action$: any,
  { clientConnection }: Dependencies
) => {
  const { states$ } = clientConnection;
  const updateConnectionState = (newState: string): Action => ({
    type: 'CONNECTION_STATE_UPDATE',
    newState,
  });

  return action$.ofType('CONNECTION_STATE_START_TRACKING').switchMap(() =>
    states$
      // .do(s => debug(`Connection state changed to <${s}>`))
      .map(newState => updateConnectionState(newState))
  );
};

// TODO: Not doing much here yet - should be used to initiate checksum-comparison with backend-hash to validate a
// home-state reload.
export const connectionStateUpdate = (action$: any) =>
  action$
    .ofType('CONNECTION_STATE_UPDATE')
    .do(action =>
      debug(`Connection state change to <${action.newState}> detected!`)
    )
    .switchMap(action => Observable.empty());

export const startConnErrorTracking = (
  action$: any,
  { clientConnection }: Dependencies
) => {
  const { errors$ } = clientConnection;
  const updateConnErrorState = (newError: string): Action => ({
    type: 'CONNECTION_ERROR_UPDATE',
    newError,
  });

  return action$
    .ofType('CONNECTION_ERROR_START_TRACKING')
    .switchMap(() =>
      errors$
        .do(s => debug(`Connection error occured <${s}>`))
        .map(newError => updateConnErrorState(newError))
    );
};
