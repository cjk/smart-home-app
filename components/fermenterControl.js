// @flow

import type { RunTimeState, Devices } from '../types/fermenter';

import React from 'react';
import { connect } from 'react-redux';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import StartIcon from 'material-ui-icons/PlayArrow';
import StopIcon from 'material-ui-icons/Stop';
import FermenterIcon from 'material-ui-icons/CallToAction';
import FermenterDevice from './fermenterDevice';

import { compose, isEmpty, mapObjIndexed, or, values } from 'ramda';

type Props = {
  rts: RunTimeState,
  devices: Devices,
  classes: Object,
  sendFermenterCmd: Function,
  sendFermenterTempLimits: Function,
};

const fermenterControlStyles = createStyleSheet('FermenterControl', theme => ({
  controlsContainer: { flexGrow: 1, marginLeft: 10, marginRight: 10 },
  fermenterDetails: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  fermenterIcon: { display: 'block', margin: 'auto' },
  fermenterCard: {
    display: 'flex',
  },
  devControls: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
  },
}));

const FermenterControl = ({
  rts,
  devices,
  classes,
  sendFermenterCmd,
  sendFermenterTempLimits,
}: Props) => {
  const fermenterIsRunning = () => rts.active;

  const toggleDevice = name => {
    /* Only allow switching fermenter itself on/off for now */
    if (name !== 'fermenter') {
      return false;
    }
    return fermenterIsRunning()
      ? sendFermenterCmd('stop')
      : sendFermenterCmd('start');
  };

  return (
    <Grid container gutter={24} className={classes.controlsContainer}>
      <Grid item className={classes.controlItem}>
        <Card className={classes.fermenterCard}>
          <div className={classes.fermenterDetails}>
            <CardContent className={classes.fermenterIcon}>
              <Avatar>
                <FermenterIcon />
              </Avatar>
            </CardContent>
            <div className={classes.devControls}>
              <Button color="primary" onClick={() => toggleDevice('fermenter')}>
                <StartIcon />
              </Button>
            </div>
          </div>
        </Card>
      </Grid>
      {compose(
        values,
        mapObjIndexed((dev, name) =>
          <Grid item className={classes.controlItem} key={name}>
            <FermenterDevice name={name} isOn={dev.isOn} />
          </Grid>
        )
      )(devices)}
    </Grid>
  );
};

export default compose(
  withStyles(fermenterControlStyles),
  connect(state => ({
    devices: state.fermenter.devices,
    rts: state.fermenter.rts,
  }))
)(FermenterControl);
