// @flow

import type { RunTimeState, Devices } from '../types/fermenter';

import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import StartIcon from 'material-ui-icons/PlayArrow';
import StopIcon from 'material-ui-icons/Stop';
import FermenterIndicator from './FermenterIndicator';
import FermenterDevice from './FermenterDevice';
import FermenterTempRangeControl from './FermenterTempRangeControl';

import { compose, mapObjIndexed, values } from 'ramda';

type Props = {
  rts: RunTimeState,
  devices: Devices,
  classes: Object,
  sendFermenterCmd: Function,
  sendFermenterTempLimits: Function,
};

const fermenterControlStyles = {
  controlsContainer: {
    flexGrow: 1,
    //     flexDirection: 'column',
  },
  controlItem: {
  },
  fermenterDetails: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  fermenterIcon: {
    display: 'block',
    margin: 'auto',
  },
  fermenterCard: {
    display: 'flex',
  },
  devControls: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'column',
    height: 'auto',
  },
  tempRangeControl: {
    marginTop: 10,
  },
};

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
    <Grid container spacing={24} className={classes.controlsContainer}>
      <Grid item xs={12} sm={6} className={classes.controlItem}>
        <Card className={classes.fermenterCard}>
          <div className={classes.fermenterDetails}>
            <CardContent className={classes.fermenterIcon}>
              <FermenterIndicator isOn={fermenterIsRunning()} />
            </CardContent>
            <CardActions className={classes.devControls}>
              <Button
                color="default"
                raised
                onClick={() => toggleDevice('fermenter')}
              >
                {fermenterIsRunning() ? <StopIcon /> : <StartIcon />}
              </Button>

              <Divider className={classes.tempRangeControl} />

              <FermenterTempRangeControl
                tempLimits={rts.tempLimits}
                changeAction={sendFermenterTempLimits}
              />
            </CardActions>
          </div>
        </Card>
      </Grid>
      {compose(
        values,
        mapObjIndexed((dev, name) => (
          <Grid item xs={6} sm={3} className={classes.controlItem} key={name}>
            <FermenterDevice name={name} isOn={dev.isOn} />
          </Grid>
        ))
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
