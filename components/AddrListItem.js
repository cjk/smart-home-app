// @flow

import type { KnxAddress } from '../types';
import React from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import { curry } from 'ramda';

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import visualizeAddrValue from '../lib/shared/visualizeAddresses';

type Props = {
  address: KnxAddress,
  classes: Object,
  //   writeGroupAddr: typeof writeGroupAddr,
};

const addrLineStyles = createStyleSheet('AddressLine', theme => ({
  addrItemContainer: {
    flexGrow: 1,
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
}));

// Generate last-updated time in words
const lastUpdated = timestamp => ` - ${distanceInWordsToNow(timestamp)} ago`;
const genTitle = curry(addr => `${addr.func} ${lastUpdated(addr.updatedAt)}`);

const AddressListItem = ({ address, classes }: Props) =>
  <ListItem dense className={classes.addrItemContainer}>
    <Grid container gutter={24}>
      <Grid item xs>
        {visualizeAddrValue(address)}
      </Grid>
      <Grid item xs={6}>
        <ListItemText primary={address.name} secondary={address.story} />
      </Grid>
      <Grid item xs>
        <ListItemText primary={address.id} secondary={genTitle(address)} />
      </Grid>
    </Grid>
  </ListItem>;

export default withStyles(addrLineStyles)(AddressListItem);
