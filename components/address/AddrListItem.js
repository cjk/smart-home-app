// @flow

import type { KnxAddress } from '../../types'
import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'

import { curry } from 'ramda'

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import VisualizedAddress from '../../lib/shared/visualizeAddress'

type Props = {
  address: KnxAddress,
  classes: Object,
  addrSwitch: React.Element<*>,
}

const addrLineStyles = theme => ({
  listContainer: {
    flexGrow: 1,
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  gridContainer: {
    flexWrap: 'nowrap',
  },
})

// Generate last-updated time in words
const lastUpdated = timestamp => ` - ${distanceInWordsToNow(timestamp)} ago`

const genValue = addr => {
  switch (addr.func) {
    case null:
      return addr.value
    case 'light':
      return addr.value ? 'ON' : 'OFF'
    case 'inhibit':
      return addr.value ? 'ON' : 'OFF'
    case 'scene':
      return addr.value === null ? '?' : addr.value
    case 'shut':
      return addr.value ? 'UP' : 'DOWN'
    case 'contact':
      return addr.value ? 'OPEN' : 'CLOSED'
    default:
      return addr.value
  }
}

const genTitle = curry(addr => `${genValue(addr)} ${lastUpdated(addr.updatedAt)}`)

const AddressListItem = ({ address, classes, addrSwitch }: Props) => (
  <ListItem dense className={classes.listContainer}>
    <Grid className={classes.gridContainer} style={{ flexWrap: 'nowrap' }} container>
      <Grid item xs={4} className="gridItem">
        <VisualizedAddress addr={address} />
      </Grid>
      <Grid item xs={4} className="gridItem">
        <ListItemText primary={address.name} secondary={address.story} />
      </Grid>
      <Grid item xs className="gridItem">
        <ListItemText primary={address.id} secondary={genTitle(address)} />
      </Grid>
      {addrSwitch && (
        <Grid item xs className="gridItem">
          {addrSwitch}
        </Grid>
      )}
    </Grid>
  </ListItem>
)

export default withStyles(addrLineStyles)(AddressListItem)
