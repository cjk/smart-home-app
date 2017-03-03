/* @flow */
import type { Action, Deps } from '../types';
import { Observable } from 'rxjs/Observable';
import { REHYDRATE } from 'redux-persist/constants';
import { processEvent, requestInitialStateSuccess } from '../home/actions';

export const appError = (error: Object): Action => ({
  type: 'APP_ERROR',
  payload: { error },
});

export const appOnline = (online: boolean): Action => ({
  type: 'APP_ONLINE',
  payload: { online },
});

export const appShowMenu = (menuShown: boolean): Action => ({
  type: 'APP_SHOW_MENU',
  payload: { menuShown },
});

// Called on componentDidMount aka only at the client (browser or native).
export const appStart = (): Action => ({
  type: 'APP_START',
});

export const appStarted = (): Action => ({
  type: 'APP_STARTED',
});

export const appStop = (): Action => ({
  type: 'APP_STOP',
});

export const appStorageLoaded = (state: Object): Action => ({
  type: 'APP_STORAGE_LOADED',
  payload: { state },
});

const appStartEpic = (action$: any) =>
  action$.ofType(REHYDRATE)
         .map(appStarted);

const createBusEventSubStream = client =>
  Observable.create((observer) => {
    const onEvent = (e) => {
      observer.next(e);
    };
    console.log('[appStartedDeepstreamEpic] - Subscribing to deepstream events');
    client.event.subscribe('knx/event', onEvent);
    return () => {
      client.event.unsubscribe('knx/event', onEvent);
    };
  });

const createInitialstateReqStream = client =>
  Observable.create((observer) => {
    console.log('[appStartedDeepstreamEpic] - Requesting initial state');
    client.record.snapshot('knx/initialBusState', (error, record) => {
      if (error) {
        console.error('Error requesting initialBusState from deepstream');
        observer.error('Error requesting initialBusState from deepstream');
      }
      observer.next(record);
      observer.complete();
    });
    /* No cleanup necessary, we only requested a snapshot above */
    return () => {};
  });

const appStartedDeepstreamEpic = (action$: any, deps: Deps) => {
  const { homeConnect } = deps;

  /* Request initial bus-state from peer / backend */
  const deepstream$ = homeConnect()
    .connOpen()
    .switchMap(client => (
      createInitialstateReqStream(client)
        .map(requestInitialStateSuccess)
        .merge(
          /* TODO: Should subscribes only occur in browser-env?! */
          createBusEventSubStream(client).map(processEvent)
        )));

  const streams = [
    deepstream$
  ];

  return action$
    .filter((action: Action) => action.type === 'APP_STARTED')
    .mergeMap(() => Observable
      .merge(...streams)
      // takeUntil unsubscribes all merged streams on APP_STOP.
      .takeUntil(
        action$.filter((action: Action) => action.type === 'APP_STOP'),
      ));
};

export const epics = [
  appStartEpic,
  appStartedDeepstreamEpic,
];
