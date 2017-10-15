/* @flow */

// Presentational-component to visualize a scene

import type { Scene } from '../types';

import * as React from 'react';

import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { compose } from 'ramda';

type Props = {
  scene: Scene,
  classes: Object,
};

const sceneStyles = theme => ({
  card: {
    minWidth: 275,
  },
});

const SceneCard = ({ scene, classes }: Props) => (
  <div className="sceneCard">
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h3">
          {scene.name}
        </Typography>
        <Typography type="body1">Makes my heart beat</Typography>
      </CardContent>
    </Card>
  </div>
);

export default compose(withStyles(sceneStyles))(SceneCard);
