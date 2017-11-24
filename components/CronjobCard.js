/* @flow */

// Presentational-component to visualize a cronjob

import type { CronJob } from '../types';

import * as React from 'react';

import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { compose, isNil } from 'ramda';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

type Props = {
  cronjob: CronJob,
  onCronjobAction: Function,
  classes: Object,
};

const cronjobStyles = theme => ({
  card: {
    margin: '2em',
    maxWidth: 275,
    minWidth: 275,
  },
  jobTitle: {
    marginBottom: 5,
    color: theme.palette.text.secondary,
  },
  jobName: {
    marginBottom: 14,
  },
  jobDetails: {
    marginBottom: 6,
  },
});

const CronjobCard = ({ cronjob, classes }: Props) => (
  <div className="cronjobCard">
    <Card className={classes.card}>
      <CardContent>
        <Typography type="body1" className={classes.jobTitle}>
          {`<${cronjob.repeat}> jeweils ${cronjob.at}`}
        </Typography>
        <Typography type="headline" component="h3" className={classes.jobName}>
          {cronjob.name}
        </Typography>
        <Typography type="body1" className={classes.jobTitle}>
          {cronjob.running ? 'running' : 'idle'}
        </Typography>
        <Typography component="p" className={classes.jobDetails}>
          Last run:{' '}
          {isNil(cronjob.lastRun)
            ? ' - '
            : `${distanceInWordsToNow(cronjob.lastRun)} ago`}
        </Typography>{' '}
      </CardContent>
    </Card>
  </div>
);

export default compose(withStyles(cronjobStyles))(CronjobCard);
