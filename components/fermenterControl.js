// @flow

import type { RunTimeState, Devices } from '../types/fermenter';

import React from 'react';
import { connect } from 'react-redux';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';

import { compose } from 'ramda';

type Props = {
  rts: RunTimeState,
  devices: Devices,
  classes: Object,
  sendFermenterCmd: Function,
  sendFermenterTempLimits: Function,
};

const fermenterControlStyles = createStyleSheet('FermenterControl', theme => ({
  controlCard: {
    margin: 20,
    padding: 10,
  },
}));

const FermenterControl = ({
  rts,
  devices,
  classes,
  sendFermenterCmd,
  sendFermenterTempLimits,
}: Props) =>
  <Card className={classes.controlCard}>
    <CardContent>
      Number of devices is: {Object.keys(devices).length}
    </CardContent>
  </Card>;

export default compose(
  withStyles(fermenterControlStyles),
  connect(state => ({
    devices: state.fermenter.devices,
    rts: state.fermenter.rts,
  }))
)(FermenterControl);
