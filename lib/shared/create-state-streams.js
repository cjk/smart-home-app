// @flow
import { Observable } from 'rxjs/Observable';

const createInitialstateReq$ = (client: Function) =>
  Observable.create(observer => {
    console.log('[InitialstateReq$] - Requesting initial state...');
    client.record.snapshot('knx/initialBusState', (error, record) => {
      if (error) {
        console.log('Error requesting initialBusState from deepstream');
        observer.error('Error requesting initialBusState from deepstream');
      }
      console.log('[InitialstateReq$] - done.');
      observer.next(record);
      observer.complete();
    });
    /* No cleanup necessary, we only requested a snapshot above */
    return () => {
      console.log('[InitialstateReq$] - Closing client connection.');
      client.close();
    };
  });

const createBusEventSub$ = (client: Function) =>
  Observable.create(observer => {
    const onEvent = e => {
      observer.next(e);
    };
    console.log('[createBusEventSub$] - Subscribing to deepstream events');
    client.event.subscribe('knx/event', onEvent);
    return () => {
      client.event.unsubscribe('knx/event', onEvent);
    };
  });

export { createInitialstateReq$, createBusEventSub$ };
