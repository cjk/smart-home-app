// @flow

import type { KnxAddress } from '../types';
import React from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

import { curry } from 'ramda';

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import visualizeAddrValue from '../lib/shared/visualizeAddresses';

type Props = {
  address: KnxAddress,
  room: Object,
  classes: Object,
  //   writeGroupAddr: typeof writeGroupAddr,
};

const addrLineStyles = createStyleSheet('AddressLine', theme => ({
  addrId: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
}));

// Generate last-updated time in words
const lastUpdated = timestamp => ` - ${distanceInWordsToNow(timestamp)} ago`;
const genTitle = curry(addr => `${addr.func} ${lastUpdated(addr.updatedAt)}`);

const AddressListItem = ({ address, classes }: Props) =>
  <ListItem className={classes.addrId}>
    {visualizeAddrValue(address)}
    <ListItemText primary={address.name} secondary={address.id} />
    <ListItemText primary={address.story} secondary={genTitle(address)} />
  </ListItem>;

export default withStyles(addrLineStyles)(AddressListItem);
