// @flow
import type { Action, EnvLimits, FermenterState } from '../../types/fermenter';

export const sendFermenterCmd = (cmd: string): Action => ({
  type: 'SEND_FERMENTER_CMD',
  currentCmd: cmd,
});

export const sendFermenterTempLimits = (limits: EnvLimits): Action => ({
  type: 'SEND_FERMENTER_TEMPLIMITS',
  tempLimits: limits,
});

export const processState = (newState: FermenterState): Action => ({
  type: 'PROCESS_STATE',
  newState,
});

export const subscribeToState = (): Action => ({
  type: 'SUBSCRIBE_TO_STATE',
});

export const unsubscribeToState = (): Action => ({
  type: 'UNSUBSCRIBE_TO_STATE',
});
