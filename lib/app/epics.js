// @flow
import type { Action, Dependencies } from '../../types';

import {
  createBusEventSub$,
  createInitialstateReq$,
} from '../shared/create-state-streams';

export const subscribeToBusEpic = (action$: any, deps: Dependencies) => {
  const { client, getState } = deps;
  const isAlreadySubscribed = () => getState().app.isSubscribedToBus;
  const processEvent = event => ({ type: 'PROCESS_EVENT', event });

  return action$
    .filter((action: Action) => action.type === 'SUBSCRIBE_TO_BUS')
    .filter(() => !isAlreadySubscribed()) // subscribe to bus-events only once!
    .mergeMap(() =>
      createBusEventSub$(client)
        .map(event => processEvent(event))
        .startWith({ type: 'SUBSCRIBE_TO_BUS_SUCCESS' })
    );
};

export const requestInitialState = (action$: any, deps: Dependencies) => {
  const { client } = deps;
  const requestInitialStateSuccess = livestate => ({
    type: 'REQUEST_INITIAL_STATE_SUCCESS',
    livestate,
  });

  return action$
    .filter((action: Action) => action.type === 'REQUEST_INITIAL_STATE')
    .mergeMap(() => createInitialstateReq$(client.client))
    .map(livestate => requestInitialStateSuccess(livestate));
};
