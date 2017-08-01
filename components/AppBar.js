// @flow
import React from 'react';
import Link from 'next/link';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui-icons/Home';
import { grey, indigo } from 'material-ui/colors';

type AppBarProps = {
  classes: Object,
};

const styleSheet = createStyleSheet('ButtonAppBar', {
  root: {
    position: 'relative',
    width: '100%',
    marginBottom: 80,
  },
  appBar: {
    backgroundColor: indigo[200],
  },
  homeButton: {
    // color: theme.palette.text.icon[500],
  },
  linkText: {
    color: grey[900]
  },
  flex: {
    flex: 1,
  },
});

const MainAppBar = (props: AppBarProps) => {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton aria-label="Menu" className={classes.homeButton}>
            <Link href="/">
              <a className={classes.linkText}>
                <HomeIcon />
              </a>
            </Link>
          </IconButton>

          <Button>
            <Link href="/rooms">
              <a className={classes.linkText}>Rooms</a>
            </Link>
          </Button>
          <Button>
            <Link href="/fermenter">
              <a className={classes.linkText}>Fermenter</a>
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styleSheet)(MainAppBar);
