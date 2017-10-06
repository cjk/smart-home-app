/* @flow */

// Presentational-component for history visualizations

import type { KnxAddress } from '../types';

/* Presentational component to render a simple address-list sorted by most-recently changed */
import * as React from 'react';

import {
  comparator,
  complement,
  compose,
  isNil,
  map,
  pipe,
  sort,
  values,
} from 'ramda';

import AddressListItem from '../components/AddrListItem';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';

type Props = {
  addresses: Array<KnxAddress>,
  classes: Object,
};

const hasStatus = complement(isNil);
const byHasValue = comparator(
  (a, b) => (isNil(b.value) ? hasStatus(a.value) : a.updatedAt > b.updatedAt)
);

const listStyles = theme => ({
  addrList: {
    maxWidth: 1024,
    background: theme.palette.background.paper,
  },
});

const AddressList = ({ addresses, classes }: Props) => {
  const itemizedAddress = (addr: KnxAddress) => (
    <AddressListItem key={addr.id} address={addr} />
  );

  const addrLstByDate = pipe(
    values,
    /* put active / on addresses first, but behind recently updated ones (s. below) */
    sort(byHasValue),
    // DEBUGGING:
    //     tap(a => console.log(JSON.stringify(a))),
    map(itemizedAddress),
    values /* NOTE: Make last result an array, otherwise React complains about an Object returned by #mapObjIndexed */
  );

  return <List className={classes.addrList}>{addrLstByDate(addresses)}</List>;
};

export default compose(withStyles(listStyles))(AddressList);
