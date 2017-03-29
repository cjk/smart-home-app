/* @flow */
import 'rxjs';
import { combineEpics } from 'redux-observable';
import { epics as appEpics } from './app/actions';
import { epics as smartHomeEpics } from './home/actions';
import { epics as fermenterEpics } from './fermenter/actions';

const epics = [...appEpics, ...smartHomeEpics, ...fermenterEpics];

const configureEpics = (deps: Object) =>
  (action$: any, { getState }: any) =>
    combineEpics(...epics)(action$, { ...deps, getState });

export default configureEpics;
