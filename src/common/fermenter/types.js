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

export type Device = {
  isOn: boolean,
  shouldSwitchTo: ?string,
  willSwitch: boolean,
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

export type History = {
  switchOps: Array<SwitchOp>,
  emergencies: Array<Emergency>
};

type Notification = {
  level: string,
  msg: ?string
}

type RunTimeState = {
  active: boolean,
  status: string,
  hasEnvEmergency: boolean,
  hasDeviceMalfunction: boolean,
  currentCmd: ?string,
  notifications: Array<Notification>
};

type Devices = {
  heater: Device,
  humidifier: Device
}

export type FermenterState = {
  rts: RunTimeState,
  env: Env,
  devices: Devices,
  history: History,
};

export type Action =
  { type: 'PROCESS_STATE', payload: { newState: FermenterState } }
  | { type: 'SUBSCRIBE_TO_STATE' }
  | { type: 'UNSUBSCRIBE_TO_STATE' }
  | { type: 'SEND_FERMENTER_CMD', payload: { cmd: string } }
  | { type: 'SEND_FERMENTER_CMD_SUCCESS' }
;