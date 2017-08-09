import React from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { compose } from 'ramda';

import LightIcon from 'material-ui-icons/Language';

type Props = {
  id: string,
  x: number,
  y: number,
  color: string,
  classes: Object,
};

const LightIconStyles = createStyleSheet('LightIcon', theme => ({
  container: {
    position: 'absolute',
  },
  iconBox: {},
  icon: {
    overflow: 'visible',
    pointerEvents: 'none',
  },
}));

const Light = ({ id, x, y, color, classes }: Props) =>
  <svg
    version="1.1"
    x={x}
    y={y}
    onClick={e => console.log(e.target)}
    className={classes.container}
    viewBox="0 0 800 600"
    preserveAspectRatio="xMidYMid meet"
  >
    <circle
      id={id}
      className={classes.iconBox}
      r="30"
      opacity="0"
      strokeDasharray="5.15905512, 1.28976378, 0.64488189, 1.28976378"
      strokeWidth=".64488"
    />

    <LightIcon className={classes.icon} color={color} width="20" height="20" />

  </svg>;

export default compose(withStyles(LightIconStyles))(Light);
