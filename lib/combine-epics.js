// @flow
import 'rxjs'
import type { Action, Dependencies, State } from '../types'
import type { Observable } from 'rxjs'
import { combineEpics } from 'redux-observable'
import { values } from 'ramda'

import * as appEpics from './app/epics'
import * as homeEpics from './home/epics'
import * as fermenterEpics from './fermenter/epics'

const importedEpics = {
  ...appEpics,
  ...homeEpics,
  ...fermenterEpics,
}

const epics = values(importedEpics).filter(item => typeof item === 'function')

const combinedEpics = (
  action$: Observable<Action>,
  { getState }: { getState: () => State },
  dependencies: Dependencies
) => combineEpics(...epics)(action$, { ...dependencies, getState })

export default combinedEpics
