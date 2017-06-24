// @flow

// PENDING: Actions are deprecated, we have flowtype now!

import type {
  Action,
  BusEvent,
  CronJob,
  KnxAddress,
  SmartHomeState,
} from '../../types';
import { assoc } from 'ramda';

// export const requestInitialStateSuccess = (
//   smartHomeState: SmartHomeState
// ): Action => ({
//   type: 'REQUEST_INITIAL_STATE_SUCCESS',
//   payload: smartHomeState,
// });

export const processEvent = (event: BusEvent) => ({
  getUid,
}: Function): Action => {
  const newEvent = assoc('id', getUid(), event);
  return {
    type: 'PROCESS_EVENT',
    payload: { newEvent },
  };
};

export const toggleShowOnlyActive = (value: boolean): Action => ({
  type: 'TOGGLE_SHOW_ONLY_ACTIVE',
  payload: !value,
});

export const createCronjob = (job: CronJob): Action => ({
  type: 'CREATE_CRONJOB',
  payload: job,
});

// export const writeGroupAddr = (addr: KnxAddress): Action => ({
//   type: 'WRITE_GROUP_ADDRESS',
//   payload: { addr },
// });

export const writeGroupAddrDone = () => ({
  type: 'WRITE_GROUP_ADDRESS_DONE',
});
