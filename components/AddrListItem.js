// @flow

import type { KnxAddress } from '../types';
import React from 'react';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Grid from 'material-ui/Grid';

import { curry } from 'ramda';

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import visualizeAddrValue from '../lib/shared/visualizeAddresses';

type Props = {
  address: KnxAddress,
  classes: Object,
  addrSwitch: React.Element<*>,
};

const addrLineStyles = theme => ({
  listContainer: {
    flexGrow: 1,
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  gridContainer: {
    flexWrap: 'nowrap',
  },
});

// Generate last-updated time in words
const lastUpdated = timestamp => ` - ${distanceInWordsToNow(timestamp)} ago`;
const genTitle = curry(addr => `${addr.func} ${lastUpdated(addr.updatedAt)}`);

const AddressListItem = ({ address, classes, addrSwitch }: Props) => (
  <ListItem dense className={classes.listContainer}>
    <Grid
      className={classes.gridContainer}
      style={{ flexWrap: 'nowrap' }}
      container
    >
      <Grid item xs className="gridItem">
        {visualizeAddrValue(address)}
      </Grid>
      <Grid item xs={4} className="gridItem">
        <ListItemText primary={address.name} secondary={address.story} />
      </Grid>
      <Grid item xs className="gridItem">
        <ListItemText primary={address.id} secondary={genTitle(address)} />
      </Grid>
      {addrSwitch && (
        <Grid item xs className="gridItem">
          {addrSwitch}
        </Grid>
      )}
    </Grid>
  </ListItem>
);

export default withStyles(addrLineStyles)(AddressListItem);
