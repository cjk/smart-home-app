// @flow

import type { KnxAddress } from '../../types'
import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Switch from '@material-ui/core/Switch'

type Props = {
  switchAction: Function,
  address: KnxAddress,
  classes: Object,
  //   writeGroupAddr: typeof writeGroupAddr,
}

const styles = theme => ({
  addrSwitch: {
    //     color: theme.palette.text.secondary,
  },
})

const AddressSwitch = ({ switchAction, address, classes }: Props) => (
  <ListItemSecondaryAction className={classes.addrSwitch}>
    <Switch onClick={() => switchAction(address)} checked={!!address.value} />
  </ListItemSecondaryAction>
)

export default withStyles(styles)(AddressSwitch)
