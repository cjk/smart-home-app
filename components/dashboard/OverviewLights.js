/* @flow */

/* Presentational component for a list of switched-on lights */

import type { KnxAddress, Prefs, Rooms } from '../../types'

import * as React from 'react'
import VisualizedAddress from '../../lib/shared/visualizeAddress'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

import { compose, curry, isEmpty, length, map, sort, take, values } from 'ramda'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List, { ListItem, ListItemText } from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'

type Props = {
  addresses: Array<KnxAddress>,
  prefs: Prefs,
  rooms: Rooms,
  onLightSwitch: Function,
  classes: Object,
}

const addrListStyles = theme => ({
  root: {
    margin: 50,
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  title: {
    padding: 20,
  },
  addrList: {
    background: theme.palette.background.paper,
    textAlign: 'auto',
  },
})

const maxShownItems = 6

const addrItemLst = curry((onLightSwitch, addresses) =>
  map(addr => (
    <ListItem key={addr.id} onClick={() => onLightSwitch(addr)} dense button>
      <VisualizedAddress addr={addr} />
      <ListItemText
        primary={addr.name}
        secondary={`${distanceInWordsToNow(addr.updatedAt)} ago`}
      />
    </ListItem>
  ))(addresses)
)

const LightsList = ({ addresses, classes, onLightSwitch }: Props) => {
  const addrItems = compose(
    addrItemLst(onLightSwitch),
    take(maxShownItems),
    sort((a, b) => a.updatedAt - b.updatedAt),
    values
  )(addresses)

  const skippedAddressCount = Math.max(
    0,
    length(values(addresses)) - maxShownItems
  )

  return (
    <Paper className={classes.root}>
      <Typography type="body1" className={classes.title}>
        Remaining lights
      </Typography>
      <List className={classes.addrList}>
        {isEmpty(addrItems) ? (
          <ListItem>
            <ListItemText
              inset
              className={classes.listItemText}
              primary="-- --"
            />
          </ListItem>
        ) : (
          addrItems
        )}
        {skippedAddressCount > 0 ? (
          <ListItem>
            <ListItemText secondary={`${skippedAddressCount} more skipped`} />
          </ListItem>
        ) : (
          <span />
        )}
      </List>
    </Paper>
  )
}

export default compose(withStyles(addrListStyles))(LightsList)
