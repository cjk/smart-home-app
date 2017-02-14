/* @flow */

// Algebraic types are composable, so it makes sense to have them at one place.
// blog.ploeh.dk/2016/11/28/easy-domain-modelling-with-types

import type { FermenterState } from './fermenter/types';

// Core

export type Deps = {
  FBSDK: any,
  firebase: any,
  firebaseAuth: Function,
  firebaseDatabase: any,
  getState: () => Object,
  getUid: () => string,
  now: () => number,
  validate: (json: Object) => any,
  /* SmartHome-methods */
  homeConnect: Function,
};

// Models

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

export type User = {
  displayName: string,
  email: ?string,
  id: string,
  photoURL: ?string,
};

// Reducers

export type AppState = {
  error: ?Error,
  menuShown: boolean,
  online: boolean,
  started: boolean,
};

export type AuthState = {
  formDisabled: boolean,
  error: ?Error,
};

export type ConfigState = {
  appName: string,
  appVersion: string,
  firebase: ?Object,
  sentryUrl: string,
};

export type DeviceState = {
  host: string,
  isReactNative: boolean,
  platform: string,
};

export type IntlState = {
  currentLocale: ?string,
  defaultLocale: ?string,
  initialNow: ?number,
  locales: ?Array<string>,
  messages: ?Object,
};

export type ThemeState = {
  currentTheme: ?string,
};

/* TODO: Split into KNX- and App-parts */
export type SmartHomeState = {
  livestate: {[id: string]: KnxAddress},
  eventHistory: Array<BusEvent>,
  prefs: ?Object,
};

export type UsersState = {
  online: ?Array<User>,
  viewer: ?User,
};

// State

export type State = {
  app: AppState,
  auth: AuthState,
  config: ConfigState,
  device: DeviceState,
  fields: any,
  intl: IntlState,
  themes: ThemeState,
  smartHome: SmartHomeState,
  fermenter: FermenterState,
  users: UsersState,
};

// Actions

export type Action =
  { type: 'APP_ERROR', payload: { error: Error } }
  | { type: 'PROCESS_EVENT', payload: { newEvent: BusEvent } }
  | { type: 'WRITE_GROUP_ADDRESS', payload: { addr: KnxAddress } }
  | { type: 'WRITE_GROUP_ADDRESS_DONE' }
  | { type: 'REQUEST_INITIAL_STATE' }
  | { type: 'REQUEST_INITIAL_STATE_SUCCESS', payload: SmartHomeState }
  | { type: 'SWITCH_TO_TAB', payload: { tabId: number } }
  | { type: 'APP_ONLINE', payload: { online: boolean } }
  | { type: 'APP_SHOW_MENU', payload: { menuShown: boolean } }
  | { type: 'APP_START' }
  | { type: 'APP_STARTED' }
  | { type: 'APP_STOP' }
  | { type: 'APP_STORAGE_LOADED' }
  | { type: 'ON_AUTH', payload: { firebaseUser: ?Object } }
  | { type: 'ON_USERS_PRESENCE', payload: { presence: Object } }
  | { type: 'RESET_PASSWORD', payload: { email: string } }
  | { type: 'SAVE_USER_DONE' }
  | { type: 'SET_CURRENT_LOCALE', payload: { locale: string } }
  | { type: 'SET_THEME', payload: { theme: string } }
  | { type: 'SIGN_IN', payload: { providerName: string, options?: Object } }
  | { type: 'SIGN_IN_DONE', payload: { user: ?User } }
  | { type: 'SIGN_IN_FAIL', payload: { error: Error } }
  | { type: 'SIGN_OUT' }
  | { type: 'SIGN_UP', payload: { providerName: string, options?: Object } }
  | { type: 'SIGN_UP_DONE', payload: { user: ?User } }
  | { type: 'SIGN_UP_FAIL', payload: { error: Error } }
;
