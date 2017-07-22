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
      console.log('[InitialstateReq$] - ...emitting state');
      observer.next(record);
      observer.complete();
    });
    /* No cleanup necessary, we only requested a snapshot above */
    return () => {
      // NOTE: If we close the connection here, we need to teach our connection-client to re-open it on forthcoming requests!
      console.log(
        '[InitialstateReq$] - Observer complete... but leaving client connection open.'
      );
      // console.log('[InitialstateReq$] - Closing client connection.');
      // client.close();
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
