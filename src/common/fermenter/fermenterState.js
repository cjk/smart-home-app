/* DEPRECATED - use flow-types instead - see ./types.js */
/* NOTE / IMPORTANT: This is *almost* a 1:1 verbatim copy of the file
   'initialState.js' from our fermenter-project. Both files should be kept in
   sync most of the time. */
import { Record, Map, Seq, List } from 'immutable';

const Env = new Record({
  createdAt: null,
  temperature: null,
  humidity: null,
  isValid: false,
  errors: 0,
  iterations: 0,
});

const Device = new Record({
  isOn: false,
  shouldSwitchTo: null,
  willSwitch: false,
});

const SwitchOp = new Record({
  device: '',
  to: null,
  at: undefined,
});

const Emergency = new Record({
  device: null,
  sensor: null,
  at: undefined,
});

const History = new Record({
  switchOps: new Seq(),
  emergencies: new Seq()
});

const RunTimeState = new Record({
  active: false,
  status: 'dead',
  hasEnvEmergency: false,
  hasDeviceMalfunction: false,
  currentCmd: null,
  notifications: new List()
});

const FermenterState = new Map({
  rts: new RunTimeState(),
  env: new Env(),
  devices: new Map({
    heater: new Device(),
    humidifier: new Device()
  }),
  history: new History()
});

export { Env, Device, History, SwitchOp, Emergency };
export default FermenterState;
