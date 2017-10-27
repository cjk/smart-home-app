/* @flow */

// Presentational-component to visualize a scene

import type { Scene } from '../types';

import * as React from 'react';

import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import { Button } from 'material-ui';
import Typography from 'material-ui/Typography';
import { compose } from 'ramda';

type Props = {
  scene: Scene,
  onSceneAction: Function,
  classes: Object,
};

const sceneStyles = {
  card: {
    margin: '2em',
    maxWidth: 275,
    minWidth: 275,
  },
};

const SceneCard = ({ scene, onSceneAction, classes }: Props) => (
  <div className="sceneCard">
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h3">
          {scene.name}
        </Typography>
        <Typography type="body1">
          Enthält {`${scene.tasks.length}`} Aktionen
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={() => onSceneAction(scene.id)}>
          On
        </Button>
        <Button color="primary" onClick={() => onSceneAction(scene.id, false)}>
          Off
        </Button>
      </CardActions>
    </Card>
  </div>
);

export default compose(withStyles(sceneStyles))(SceneCard);
