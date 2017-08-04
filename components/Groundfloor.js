import type { Dispatch, KnxAddress, Prefs, Rooms, State } from '../types';

import React from 'react';
import { connect } from 'react-redux';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { compose } from 'ramda';

import Foo from 'material-ui-icons/Language';

type Props = {
  addresses: Array<KnxAddress>,
  prefs: Prefs,
  rooms: Rooms,
  classes: Object,
  dispatch: Dispatch,
};

const groundFloorStyles = createStyleSheet('Groundfloor', theme => ({
  invincible: {
    pointerEvents: 'none',
  },
}));

const Groundfloor = ({ addresses, dispatch, prefs, rooms, classes }: Props) =>
  <svg
    id="SVGRoot"
    version="1.1"
    viewBox="0 0 800 600"
    preserveAspectRatio="xMidYMid meet"
    onClick={e => console.log(e.target)}
  >
    <g stroke="#000">
      <path
        d="m290 30v90h-280v470.94h770v-470.94l-250 1.6002v-91.6z"
        fill="#fff"
        strokeWidth="1.0188"
      />
      <g fill="none">
        <path d="m10 470h210v120" strokeWidth=".723px" />
        <path d="m220 470v-180h-210" strokeWidth=".82158px" />
        <path
          d="m510 590v-270l-40-40h-50l-75 75 55 55 50-50 60 60"
          strokeWidth="1px"
        />
        <path d="m390 590v-50l120-120" strokeWidth="1px" />
      </g>
    </g>
    <g fill="#e9e9e9" stroke="#000">
      <rect
        x="600"
        y="290"
        width="110"
        height="220"
        strokeDasharray="0.14832843, 0.14832843000000001"
        strokeWidth=".59331"
      />
      <g strokeDasharray="0.16125, 0.16125000000000000" strokeWidth=".645">
        <rect x="570" y="150" width="170" height="70" />
        <rect x="40" y="470" width="80" height="60" />
        <rect x="30" y="560" width="190" height="30" />
        <circle opacity="0.10" cx="505.22" cy="274.66" r="25" />
        <Foo className={classes.invincible} color="green" x="510" y="280" width="20" height="20" />
      </g>
      <rect
        x="250"
        y="120"
        width="40"
        height="110"
        strokeDasharray="0.16912043, 0.16912042999999999"
        strokeWidth=".67648"
      />
      <rect
        x="220"
        y="130"
        width="30"
        height="90"
        strokeDasharray="0.15834435, 0.15834434999999999"
        strokeWidth=".63338"
      />
      <rect
        x="220"
        y="540"
        width="40"
        height="50"
        strokeDasharray="0.14720044, 0.14720043999999999"
        strokeWidth=".5888"
      />
      <g strokeDasharray="0.16125, 0.16125000000000000" strokeWidth=".645">
        <rect x="550" y="560" width="230" height="30" />
        <rect x="510" y="320" width="40" height="270" />
        <rect x="10" y="260" width="210" height="30" />
      </g>
    </g>
  </svg>;

export default compose(
  connect((state: State) => ({
    addresses: state.smartHome.livestate,
    prefs: state.app.prefs,
    rooms: state.app.rooms,
  })),
  withStyles(groundFloorStyles)
)(Groundfloor);
