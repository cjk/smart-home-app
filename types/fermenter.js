/* @flow */

/* Fermenter related type definitions for Flow */
export type Env = {
  createdAt: number,
  temperature: ?number,
  humidity: ?number,
  isValid: boolean,
  errors: number,
  iterations: number,
};

type Device = {
  isOn: boolean,
  shouldSwitchTo: ?string,
  willSwitch: boolean,
};

export type Devices = {
  heater: Device,
  humidifier: Device,
};

export type SwitchOp = {
  device: ?string,
  to: ?string,
  at: ?number,
};

export type Emergency = {
  device: ?string,
  sensor: ?string,
  at: ?number,
};

type Notification = {
  level: string,
  msg: ?string,
};

export type History = {
  switchOps: Array<SwitchOp>,
  emergencies: Array<Emergency>,
};

export type EnvLimits = Array<number>;

export type RunTimeState = {
  active: boolean,
  status: string,
  hasEnvEmergency: boolean,
  hasDeviceMalfunction: boolean,
  currentCmd: ?string,
  tempLimits: EnvLimits,
  humidityLimits: EnvLimits,
  notifications: Array<Notification>,
};

export type FermenterState = {
  rts: RunTimeState,
  env: Env,
  devices: Devices,
  history: History,
};

export type Action =
  | { type: 'SUBSCRIBE_TO_STATE' }
  | { type: 'UNSUBSCRIBE_TO_STATE' }
  | { type: 'PROCESS_STATE', newState: FermenterState }
  | { type: 'SEND_FERMENTER_CMD', currentCmd: string }
  | {
      type: 'SEND_FERMENTER_TEMPLIMITS',
      tempLimits: EnvLimits,
    };
