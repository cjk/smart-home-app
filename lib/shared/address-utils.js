// @flow
import type { KnxAddress } from '../../types';
import { assoc, allPass, filter } from 'ramda';

// Filter-conditions for addresses to be on the list
const isOn = addr => addr.value === 1;
const isLight = addr => addr.func === 'light';
const noFeedback = addr => addr.type !== 'fb';
const onlyButtonControlled = addr => addr.control === 'btn';

export const toggleAddrVal = (address: KnxAddress) =>
  assoc('value', !address.value | 0, address);

export const onlyManuallySwitchedLights = addresses =>
  filter(allPass([isOn, isLight, noFeedback, onlyButtonControlled]))(addresses);
