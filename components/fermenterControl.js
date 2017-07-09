// @flow

import type { RunTimeState, Devices } from '../types/fermenter';

import React from 'react';
import { connect } from 'react-redux';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import HumidifierIcon from 'material-ui-icons/Cloud';
import HeaterIcon from 'material-ui-icons/AcUnit';
import StartIcon from 'material-ui-icons/PlayArrow';
import StopIcon from 'material-ui-icons/Stop';
import FermenterIcon from 'material-ui-icons/CallToAction';

import { compose } from 'ramda';

type Props = {
  rts: RunTimeState,
  devices: Devices,
  classes: Object,
  sendFermenterCmd: Function,
  sendFermenterTempLimits: Function,
};

const fermenterControlStyles = createStyleSheet('FermenterControl', theme => ({
  controlsContainer: {},
  FermenterControl: {
    display: 'flex',
    flexDirection: 'column',
  },
  controlCard: {
    display: 'flex',
    margin: 20,
    padding: 10,
  },
  devControls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 8,
    paddingBottom: 8,
  },
  deviceState: {
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
  <div className={classes.controlsContainer}>
    <Card className={classes.controlCard}>
      <div className={classes.fermenterControl}>
        <CardContent>
          <Avatar>
            <FermenterIcon />
          </Avatar>
        </CardContent>
        <div className={classes.devControls}>
          <IconButton>
            <StartIcon />
          </IconButton>
          <IconButton>
            <StopIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.deviceState}>
        <Avatar>
          <HumidifierIcon />
        </Avatar>
      </div>
    </Card>
  </div>;

export default compose(
  withStyles(fermenterControlStyles),
  connect(state => ({
    devices: state.fermenter.devices,
    rts: state.fermenter.rts,
  }))
)(FermenterControl);
