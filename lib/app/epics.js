// @flow

import type { Action, Dependencies } from '../../types';

import logger from 'debug';
import {
  createBusEventSub$,
  createInitialstateReq$,
} from '../shared/create-state-streams';
import { anyPass, contains } from 'ramda';

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

export const requestInitialState = (action$: any, { client }: Dependencies) => {
  const requestInitialStateSuccess = (livestate): Action => ({
    type: 'REQUEST_INITIAL_STATE_SUCCESS',
    livestate,
  });

  return action$
    .filter((action: Action) => action.type === 'REQUEST_INITIAL_STATE')
    .mergeMap(() => createInitialstateReq$(client))
    .map(livestate => requestInitialStateSuccess(livestate));
};

// We do connection-tracking to
// 1. Show the user if he's on- or offline
// 2. Allow for automatic state-refresh (via #requestInitialState) on temporary connection-loss
export const startConnectionTracking = (
  action$: any,
  { clientConnection }: Dependencies
) => {
  const { states$ } = clientConnection;

  // Action to call when Connection-state changed, our reducer will save the new connection-state in our redux-global (app-) state.
  const updateConnectionState = (newState: string): Action => ({
    type: 'CONNECTION_STATE_UPDATE',
    newState,
  });

  // Connection-states that should trigger a full state refresh (#requestInitialState)
  const wasReconnecting = contains('RECONNECTING');
  const hadConnectionError = contains('ERROR');
  const wasClosed = contains('CLOSED');

  // Stream that only triggers when connection is open:
  const connectionOpen$ = states$.filter(s => s === 'OPEN');
  // Check if there was a previous connection-outage or interruption; if so, reload SmartHomeState
  const refreshStateMaybe$ = states$
    .buffer(connectionOpen$)
    .skipWhile(
      connStateAry =>
        !anyPass([wasReconnecting, hadConnectionError, wasClosed])(connStateAry)
    )
    .mapTo({ type: 'REQUEST_INITIAL_STATE' });

  // Return both streams from above as merged action-stream
  return action$
    .ofType('CONNECTION_STATE_START_TRACKING')
    .switchMap(() => states$.map(newState => updateConnectionState(newState)))
    .merge(refreshStateMaybe$);
};

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
