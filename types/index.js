// @flow
import type {
  Dispatch as ReduxDispatch,
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
  created: number,
  action: string,
  type: string,
  src: string,
  dest: string,
  value: string,
};

type Room = {
  name: string,
  story: string,
};

export type Rooms = {
  [id: string]: Room,
};

export type Prefs = {
  rooms: Array<string>,
  showOnlyActive: boolean,
};

export type AddressMap = { [id: string]: KnxAddress };

export type SmartHomeState = {
  livestate: { [id: string]: KnxAddress },
  eventHistory: Array<BusEvent>,
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
  prefs: Prefs,
  rooms: Rooms,
  isSubscribedToBus: boolean,
  ui: {
    selectedListTab: number,
  },
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

// Actions
export type Action =
  | { type: 'CREATE_CRONJOB', payload: CronJob }
  | { type: 'PROCESS_EVENT', event: BusEvent }
  | { type: 'WRITE_GROUP_ADDRESS', addr: KnxAddress }
  | { type: 'WRITE_GROUP_ADDRESS_DONE' }
  | { type: 'REQUEST_INITIAL_STATE' }
  | { type: 'REQUEST_INITIAL_STATE_SUCCESS', livestate: SmartHomeState }
  | { type: 'APP_ONLINE', payload: { online: boolean } }
  | { type: 'APP_SHOW_MENU', payload: { menuShown: boolean } }
  | { type: 'SUBSCRIBE_TO_BUS' }
  | { type: 'SUBSCRIBE_TO_BUS_SUCCESS' }
  | { type: 'TOGGLE_SHOW_ONLY_ACTIVE', toggleValue: boolean }
  | { type: 'CHANGE_SELECTED_LIST_TAB', value: number }
  | { type: 'SET_THEME', payload: { theme: string } };

export type Middleware = Array<ReduxMiddleware<State, Action>>;
export type Reducers = { +[name: $Keys<State>]: ReduxReducer<State, Action> };
export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;

// TODO: Bummer. There are no redux-observable flow definitions yet. Therefore,
// we have to use .filter instead of .ofType and we have to use
// https://flow.org/en/docs/lang/refinements.
export type Epic = (
  actions$: Observable<Action>,
  dependencies: Dependencies
) => Observable<Action>;

export type Action$ = Observable<Action>;
