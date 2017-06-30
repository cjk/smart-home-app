import type { Action, Dependencies } from '../../types';

import { createBusEventSub$ } from '../shared/create-state-streams';

export const subscribeToBusEpic = (action$: any, deps: Dependencies) => {
  const { connectClient, getState } = deps;
  const isAlreadySubscribed = () => getState().app.isSubscribedToBus;
  const processEvent = event => ({ type: 'PROCESS_EVENT', event });

  return action$
    .filter((action: Action) => action.type === 'SUBSCRIBE_TO_BUS')
    .filter(() => !isAlreadySubscribed()) // subscribe to bus-events only once!
    .mergeMap(action =>
      connectClient()
        .connOpen()
        .switchMap(client =>
          createBusEventSub$(client)
            .map(event => processEvent(event))
            .startWith({ type: 'SUBSCRIBE_TO_BUS_SUCCESS' })
        )
    );
};
