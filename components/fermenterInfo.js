// @flow

import type { Env } from '../types/fermenter';

import React from 'react';
import { connect } from 'react-redux';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Card, { CardContent } from 'material-ui/Card';
import HumIcon from 'material-ui-icons/Cloud';
import TempIcon from 'material-ui-icons/AcUnit';
import Typography from 'material-ui/Typography';

import { compose } from 'ramda';

type Props = {
  env: Env,
  classes: Object,
};

const fermenterInfoStyles = createStyleSheet('FermenterInfo', theme => ({
  infoCard: {
    // maxWidth: 350,
    margin: 20,
    padding: 25,
  },
  infoDetails: {
    display: 'flex',
    alignItems: 'baseline',
  },
  deviceReading: {
    marginRight: 50,
  },
}));

const FermenterInfo = ({ env, classes }: Props) =>
  <Card className={classes.infoCard}>
    <div className={classes.infoDetails}>
      <Avatar>
        <TempIcon />
      </Avatar>
      <CardContent className={classes.deviceReading}>
        <Typography type="headline" component="h3">
          {`${env.temperature}℃`}
        </Typography>
      </CardContent>
      <Avatar>
        <HumIcon />
      </Avatar>
      <CardContent className={classes.deviceReading}>
        <Typography type="headline" component="h3">
          {`${env.humidity}%`}
        </Typography>
      </CardContent>
    </div>
  </Card>;

export default compose(
  withStyles(fermenterInfoStyles),
  connect(state => ({ env: state.fermenter.env }))
)(FermenterInfo);
