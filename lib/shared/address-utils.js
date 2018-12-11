// @flow

import type { KnxAddress, AddressMap } from '../../types'
import { assoc, allPass, filter } from 'ramda'

// Filter-conditions for addresses
const isOn = addr => addr.value === 1
const isLight = addr => addr.func === 'light'
const noFeedback = addr => addr.type !== 'fb'
const onlyButtonControlled = addr => addr.control === 'btn'

export const toggleAddrVal = (address: KnxAddress) => assoc('value', !address.value | 0, address)

export const onlyManuallySwitchedLights = (addresses: AddressMap) =>
  filter(allPass([isOn, isLight, noFeedback, onlyButtonControlled]))(addresses)
