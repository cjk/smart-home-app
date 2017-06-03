// @flow
import type {
  Middleware as ReduxMiddleware,
  Reducer as ReduxReducer,
  Store as ReduxStore,
} from 'redux';
import type { Observable } from 'rxjs';

export type KnxAddress = {
  id: string,
  name: string,
  value: ?string,
  story: ?string,
  room: ?string,
  type: ?string,
  func: ?string,
  fbAddr: ?string,
  fbValue: ?string,
  updatedAt: number,
};

export type BusEvent = {
  id: string,
  created: number,
  action: string,
  type: string,
  src: string,
  dest: string,
  value: string,
};

/* TODO: Split into KNX- and App-parts */
export type SmartHomeState = {
  livestate: { [id: string]: KnxAddress },
  eventHistory: Array<BusEvent>,
  prefs: ?Object,
};

/* Cronjob types */
export type CrontabTask = {
  targets: Array<string>,
  act: string,
};

export type CronJob = {
  jobId: string,
  name: string,
  at: string,
  repeat: string,
  scheduled: boolean,
  running: boolean,
  lastRun: Date | null,
  tasks: Array<CrontabTask>,
};

export type AppState = {
  +name: string,
  +version: string,
};

export type State = {
  +app: AppState,
  +smartHome: SmartHomeState,
};

export type Dependencies = {
  getState: () => State,
  connectClient: () => Function,
  validate: (json: Object) => any,
};

// TODO Actions
export type Action =
  | { type: 'CREATE_CRONJOB', payload: CronJob }
  | { type: 'PROCESS_EVENT', payload: { newEvent: BusEvent } }
  | { type: 'WRITE_GROUP_ADDRESS', payload: { addr: KnxAddress } }
  | { type: 'WRITE_GROUP_ADDRESS_DONE' }
  | { type: 'REQUEST_INITIAL_STATE' }
  | { type: 'REQUEST_INITIAL_STATE_SUCCESS', payload: SmartHomeState }
  | { type: 'SWITCH_TO_TAB', payload: { tabId: number } }
  | { type: 'APP_ONLINE', payload: { online: boolean } }
  | { type: 'APP_SHOW_MENU', payload: { menuShown: boolean } }
  | { type: 'CONNECT_CLIENT' }
  | { type: 'TOGGLE_SHOW_ONLY_ACTIVE', payload: boolean }
  | { type: 'SET_THEME', payload: { theme: string } };

export type Middleware = Array<ReduxMiddleware<State, Action>>;
export type Reducers = { +[reducerName: string]: ReduxReducer<State, Action> };
export type Store = ReduxStore<State, Action>;

// TODO: Bummer. There are no redux-observable flow definitions yet. Therefore,
// we have to use .filter instead of .ofType and we have to use
// https://flow.org/en/docs/lang/refinements.
export type Epic = (
  actions$: Observable<Action>,
  dependencies: Dependencies
) => Observable<Action>;
