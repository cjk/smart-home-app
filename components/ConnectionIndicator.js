/* @flow */

// Presentational-component to visualize connection state

import * as React from 'react';

import { withStyles } from 'material-ui/styles';
import { grey } from 'material-ui/colors';
import Avatar from 'material-ui/Avatar';
import ConnGoodIcon from 'material-ui-icons/SignalCellular4Bar';
import ConnBadIcon from 'material-ui-icons/SignalCellularNull';
import ConnClosedIcon from 'material-ui-icons/SignalCellularOff';

import { cond, compose, equals, T } from 'ramda';

type Props = {
  connState: string,
  classes: Object,
};

const styles = {
  connIndAvatar: {
    color: grey[600],
    backgroundColor: 'inherit',
  },
};

const iconByConnState = cond([
  [equals('CLOSED'), () => <ConnClosedIcon />],
  [equals('OPEN'), () => <ConnGoodIcon />],
  [T, () => <ConnBadIcon />],
]);

const ConnIndicator = ({ connState, classes }: Props) => (
  <div>
    <Avatar className={classes.connIndAvatar}>
      {iconByConnState(connState)}
    </Avatar>
  </div>
);

export default compose(withStyles(styles))(ConnIndicator);
