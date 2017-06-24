import type { KnxAddress } from '../../types';
import { assoc } from 'ramda';

export const toggleAddrVal = (address: KnxAddress) => assoc('value', !address.value | 0, address);
