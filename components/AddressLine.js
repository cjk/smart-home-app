// @flow

import type { KnxAddress } from '../types';
import React from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

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

const AddressLine = ({ address, classes }: Props) =>
  <div>
    <Typography type="headline" component="h3">
      {address.name}
    </Typography>
    <Typography type="body1" className={classes.addrId}>
      {address.id}
    </Typography>
  </div>;

export default withStyles(addrLineStyles)(AddressLine);
