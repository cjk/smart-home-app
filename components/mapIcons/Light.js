// @flow
import React from 'react';
import { withStyles } from 'material-ui/styles';
import { compose } from 'ramda';

import LightIconOff from 'material-ui-icons/LightbulbOutline';
// import LightIconOn from 'material-ui-icons/WbIncandescent';

type Props = {
  id: string,
  desc: string,
  isOn: boolean,
  x: number,
  y: number,
  classes: Object,
};

const LightIconStyles = {
  container: {
    position: 'absolute',
  },
  iconBox: {},
  icon: {
    overflow: 'visible',
    pointerEvents: 'none',
  },
};

const Light = ({ id, desc, x, y, isOn, classes }: Props) => (
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

    <LightIconOff
      className={classes.icon}
      color={isOn ? 'orange' : 'grey'}
      width="20"
      height="20"
    />

    <desc>{desc}</desc>
  </svg>
);

export default compose(withStyles(LightIconStyles))(Light);
