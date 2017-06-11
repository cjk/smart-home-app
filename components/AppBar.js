// @flow
import React from 'react';
import Link from 'next/link';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

type AppBarProps = {
  classes: Object,
};

const styleSheet = createStyleSheet('ButtonAppBar', {
  root: {
    position: 'relative',
    width: '100%',
  },
  appBar: {
    position: 'relative',
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
          <Typography type="title" colorInherit className={classes.flex}>
            SmartHome
          </Typography>
          <Button contrast><Link href="/"><a>Home</a></Link></Button>
          <Button contrast><Link href="/rooms"><a>Rooms</a></Link></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styleSheet)(MainAppBar);
