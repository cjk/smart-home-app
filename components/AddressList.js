/* @flow */
import type { KnxAddress, State } from '../types';

/* Presentational component to render a simple address-list sorted by most-recently changed */
import React from 'react';
import { connect } from 'react-redux';

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import visualizeAddrValue from '../lib/shared/visualizeAddresses';
import {
  comparator,
  complement,
  compose,
  curry,
  isNil,
  map,
  pipe,
  sort,
  values,
} from 'ramda';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';

type Props = {
  addresses: Array<KnxAddress>,
  classes: Object,
};

const hasStatus = complement(isNil);
const byHasValue = comparator(
  (a, b) => (isNil(b.value) ? hasStatus(a.value) : a.updatedAt > b.updatedAt)
);

// PENDING: We're getting errors when using a functional-component instead of a React-component using #withStyles from
// material-ui@next.
// Thus we're using inline-styles for now
const listStyles = createStyleSheet('AddressList', theme => ({
  addrList: {
    width: '100%',
    maxWidth: 480,
    background: theme.palette.background.paper,
  },
}));

// Generate last-updated time in words
const lastUpdated = timestamp => ` - ${distanceInWordsToNow(timestamp)} ago`;
const genTitle = curry(addr => `${addr.func} ${lastUpdated(addr.updatedAt)}`);

const AddressList = ({ addresses, classes }: Props) => {
  const itemizedAddress = addr =>
    <ListItem dense button key={addr.id}>
      {visualizeAddrValue(addr)}
      <ListItemText primary={`${addr.name}`} secondary={genTitle(addr)} />
      <ListItemText primary={`${addr.story}`} secondary={`${addr.id}`} />
    </ListItem>;

  const addrLstByDate = pipe(
    values,
    /* put active / on addresses first, but behind recently updated ones (s. below) */
    sort(byHasValue),
    // DEBUGGING:
    //     tap(a => console.log(JSON.stringify(a))),
    map(itemizedAddress),
    values /* NOTE: Make last result an array, otherwise React complains about an Object returned by #mapObjIndexed */
  );

  return (
    <List className={classes.addrList}>
      {addrLstByDate(addresses)}
    </List>
  );
};

export default compose(
  connect((state: State) => ({ addresses: state.smartHome.livestate })),
  withStyles(listStyles)
)(AddressList);
