// @flow

import type { Env } from '../types/fermenter';

import React from 'react';
import { connect } from 'react-redux';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';

import { compose } from 'ramda';

type Props = {
  env: Env,
  classes: Object,
};

const fermenterInfoStyles = createStyleSheet('FermenterInfo', theme => ({
  infoCard: {
    margin: 20,
    padding: 10,
  },
}));

const FermenterInfo = ({ env, classes }: Props) =>
  <Card className={classes.infoCard}>
    <CardContent>
      The temp is: {env.temperature}
    </CardContent>
  </Card>;

export default compose(
  withStyles(fermenterInfoStyles),
  connect(state => ({ env: state.fermenter.env }))
)(FermenterInfo);
