// @flow

// Container-component for all dashboard logic

import type { Dispatch, KnxAddress, Prefs, Rooms, State } from '../../types';

import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import OverviewLights from './OverviewLights';

import {
  toggleAddrVal,
  onlyManuallySwitchedLights,
} from '../../lib/shared/address-utils';

import { compose } from 'ramda';

type Props = {
  addresses: Array<KnxAddress>,
  prefs: Prefs,
  rooms: Rooms,
  classes: Object,
  dispatch: Dispatch,
};

// TODO
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

const Dashboard = ({ addresses, dispatch, classes }: Props) => {
  const onLightSwitch = addr =>
    dispatch({
      type: 'WRITE_GROUP_ADDRESS',
      addr: toggleAddrVal(addr),
    });

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <OverviewLights
          addresses={onlyManuallySwitchedLights(addresses)}
          onLightSwitch={onLightSwitch}
          className={classes.control}
        />
      </Grid>
    </Grid>
  );
};

export default compose(
  connect((state: State) => ({
    addresses: state.smartHome.livestate,
    prefs: state.app.prefs,
  })),
  withStyles(styles)
)(Dashboard);
