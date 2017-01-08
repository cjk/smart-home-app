/* @flow */
import type { Action, Deps } from '../types';
import { Observable } from 'rxjs/Observable';
import { REHYDRATE } from 'redux-persist/constants';
import { onAuth, signInDone, signInFail } from '../auth/actions';
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

const appStartedFirebaseEpic = (action$: any, deps: Deps) => {
  const { firebase, firebaseAuth, getState } = deps;

  const appOnline$ = Observable.create((observer) => {
    const onValue = (snap) => {
      const online = snap.val();
      if (online === getState().app.online) return;
      observer.next(appOnline(online));
    };
    firebase.child('.info/connected').on('value', onValue);
    return () => {
      firebase.child('.info/connected').off('value', onValue);
    };
  });

  // firebase.google.com/docs/reference/js/firebase.auth.Auth#onAuthStateChanged
  const onAuth$ = Observable.create((observer) => {
    const unsubscribe = firebaseAuth().onAuthStateChanged((firebaseUser) => {
      observer.next(onAuth(firebaseUser));
    });
    return unsubscribe;
  });

  const signInAfterRedirect$ = Observable.create((observer) => {
    let unsubscribed = false;
    firebaseAuth().getRedirectResult()
      .then(({ user: firebaseUser }) => {
        if (unsubscribed || !firebaseUser) return;
        observer.next(signInDone(firebaseUser));
      })
      .catch((error) => {
        if (unsubscribed) return;
        observer.error(signInFail(error));
      });
    return () => {
      unsubscribed = true;
    };
  });

  const streams = [
    appOnline$,
    onAuth$,
  ];

  if (process.env.IS_BROWSER) {
    streams.push(signInAfterRedirect$);
  }

  return action$
    .filter((action: Action) => action.type === 'APP_STARTED')
    .mergeMap(() => Observable
      .merge(...streams)
      // takeUntil unsubscribes all merged streams on APP_STOP.
      .takeUntil(
        action$.filter((action: Action) => action.type === 'APP_STOP'),
      ),
    );
};

export const epics = [
  appStartEpic,
  appStartedFirebaseEpic,
  appStartedDeepstreamEpic,
];
