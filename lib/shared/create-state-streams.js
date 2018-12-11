// @flow

import logger from 'debug'
import { Observable } from 'rxjs'

const debug = logger('smtApp:createStateStreams')

const createInitialstateReq$ = (client: Function) =>
  Observable.create(observer => {
    debug('Requesting initial state...')
    client.record.snapshot('knx/initialBusState', (error, record) => {
      if (error) {
        debug('Error requesting initialBusState from deepstream')
        observer.error('Error requesting initialBusState from deepstream')
      }
      debug('Emitting state.')
      observer.next(record)
      observer.complete()
    })
    /* No cleanup necessary, we only requested a snapshot above */
    return () => {
      // NOTE: If we'd close the connection here, we need to teach our connection-client to re-open it on forthcoming requests!
      debug('Observer complete... but leaving client connection open.')
    }
  })

const createBusEventSub$ = (client: Function) =>
  Observable.create(observer => {
    const onEvent = e => {
      observer.next(e)
    }
    debug('Subscribing to deepstream bus-events')
    client.event.subscribe('knx/event', onEvent)
    return () => {
      client.event.unsubscribe('knx/event', onEvent)
    }
  })

export { createInitialstateReq$, createBusEventSub$ }
