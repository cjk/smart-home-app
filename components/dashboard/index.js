// @flow
import type { Dispatch, KnxAddress, Prefs, Rooms, State } from '../../types';

import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import OverviewLights from './OverviewLights';

// import { toggleAddrVal } from '../lib/shared/address-utils';

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

const Dashboard = ({ addresses, rooms, dispatch, classes }: Props) => {
  // const isOn = addr => addresses[addr].value;
  // const onLightSwitch = addrId =>
  //   dispatch({
  //     type: 'WRITE_GROUP_ADDRESS',
  //     addr: toggleAddrVal(addresses[addrId]),
  //   });

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <OverviewLights addresses={addresses} className={classes.control} />
      </Grid>
    </Grid>
  );
};

export default compose(
  connect((state: State) => ({
    addresses: state.smartHome.livestate,
    prefs: state.app.prefs,
    rooms: state.app.rooms,
  })),
  withStyles(styles)
)(Dashboard);
