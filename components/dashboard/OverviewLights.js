/* @flow */

/* Presentational component for a list of switched-on lights */

import type { KnxAddress, Prefs, Rooms } from '../../types';

import * as React from 'react';
import VisualizedAddress from '../../lib/shared/visualizeAddress';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import {
  allPass,
  compose,
  filter,
  isEmpty,
  map,
  sort,
  values,
} from 'ramda';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

// import AddressSwitch from '../address/AddrItemSwitch';

type Props = {
  addresses: Array<KnxAddress>,
  prefs: Prefs,
  rooms: Rooms,
  onAddrSwitch: Function,
  classes: Object,
};

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
  listItem: {},
  listItemText: {},
});

const isOn = addr => addr.value === 1;
const isLight = addr => addr.func === 'light';

// TODO: Refactor to action-list, like so: https://material-ui-1dab0.firebaseapp.com/demos/lists/#switch

const LightsList = ({ addresses, classes }: Props) => {
  const addrItemLst = map(addr => (
    <ListItem key={addr.id} className={classes.listItem} dense>
      <VisualizedAddress addr={addr} />
      <ListItemText
        primary={addr.name}
        secondary={`${distanceInWordsToNow(addr.updatedAt)} ago`}
        className={classes.listItemText}
      />
    </ListItem>
  ));

  const addrItems = compose(
    addrItemLst,
    sort((a, b) => b.updatedAt - a.updatedAt),
    filter(allPass([isOn, isLight])),
    values
  )(addresses);

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
      </List>
    </Paper>
  );
};

export default compose(withStyles(addrListStyles))(LightsList);
