// @flow

import type { KnxAddress } from '../types';
import React from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { ListItemSecondaryAction } from 'material-ui/List';
import Switch from 'material-ui/Switch';

type Props = {
  switchAction: Function,
  address: KnxAddress,
  classes: Object,
  //   writeGroupAddr: typeof writeGroupAddr,
};

const addrSwitchStyles = createStyleSheet('AddressLine', theme => ({
  addrSwitch: {
    //     color: theme.palette.text.secondary,
  },
}));

const AddressSwitch = ({ switchAction, address, classes }: Props) =>
  <ListItemSecondaryAction className={classes.addrSwitch}>
    <Switch onClick={() => switchAction(address)} checked={!!address.value} />
  </ListItemSecondaryAction>;

export default withStyles(addrSwitchStyles)(AddressSwitch);
