// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet('ButtonAppBar', {
  root: {
    position: 'relative',
    marginTop: 30,
    width: '100%',
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
});

const ButtonAppBar = props => {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography type="title" colorInherit className={classes.flex}>
            SmartHome
          </Typography>
          <Button contrast>Home</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ButtonAppBar);
