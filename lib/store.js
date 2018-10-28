// @flow

import type { State } from '../types/'

import type { Middleware, Store } from 'redux'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import { BehaviorSubject } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { composeWithDevTools } from 'redux-devtools-extension'

import createEpics from './combine-epics'
import createReducer from './create-reducers'
import dependencies from './client/middleware'

const rootReducer = createReducer()
const epicMiddleware = createEpicMiddleware({ dependencies })

// For hot-reloading:
const epic$ = new BehaviorSubject(createEpics)
// Every time a new epic is given to epic$ it
// will unsubscribe from the previous one then
// call and subscribe to the new one because of
// how switchMap works
const hotReloadingEpic = (...args: any[]) => epic$.pipe(switchMap(epic => epic(args[0], args[1], args[2])))

const configureStore = (initialState: State): Store<any, any> => {
  const middlewares = [epicMiddleware]

  if (process.env.NODE_ENV !== 'production') {
    const reduxLogger = createLogger({ collapsed: true })
    middlewares.push(reduxLogger)
  }

  const composeEnhancers = process.browser && window.__REDUX_DEVTOOLS_EXTENSION__ ? composeWithDevTools : compose
  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)))

  epicMiddleware.run(createEpics)

  // Again, for hot-reloading only:
  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./create-reducers', () => {
        store.replaceReducer(require('./create-reducers').default)
        epicMiddleware.run(hotReloadingEpic)
        epic$.next(require('./combine-epics').default)
      })
    }
  }

  return store
}

export default configureStore
