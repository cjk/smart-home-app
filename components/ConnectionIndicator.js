/* @flow */

// Presentational-component to visualize connection state

import * as React from 'react'

import { withStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import ConnGoodIcon from '@material-ui/icons/SignalCellular4Bar'
import ConnErrorIcon from '@material-ui/icons/SignalCellularNoSim'
import ConnReconnIcon from '@material-ui/icons/SignalCellularConnectedNoInternet4Bar'
import ConnBadIcon from '@material-ui/icons/SignalCellularNull'
import ConnClosedIcon from '@material-ui/icons/SignalCellularOff'

import { cond, compose, equals, T } from 'ramda'

type Props = {
  connState: string,
  connErr: string,
  classes: Object,
}

const styles = {
  connIndAvatar: {
    color: grey[600],
    backgroundColor: 'inherit',
  },
}

const iconByConnState = cond([
  [equals('ERROR'), () => <ConnErrorIcon />],
  [equals('RECONNECTING'), () => <ConnReconnIcon />],
  [equals('CLOSED'), () => <ConnClosedIcon />],
  [equals('OPEN'), () => <ConnGoodIcon />],
  [T, () => <ConnBadIcon />],
])

const ConnIndicator = ({ connState, connErr, classes }: Props) => (
  <div>
    <Tooltip id="err_tooltip" title={connErr} placement="bottom">
      <Avatar className={classes.connIndAvatar}>{iconByConnState(connState)}</Avatar>
    </Tooltip>
  </div>
)

export default compose(withStyles(styles))(ConnIndicator)
