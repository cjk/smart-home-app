// @flow

import type { Env } from '../../types/fermenter'

import * as React from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import HumIcon from '@material-ui/icons/Cloud'
import TempIcon from '@material-ui/icons/AcUnit'

import { compose } from 'ramda'

type Props = {
  env: Env,
  classes: Object,
}

const fermenterInfoStyles = {
  infoCard: {
    marginTop: 20,
    padding: 15,
  },
  infoDetails: {
    display: 'flex',
    alignItems: 'baseline',
  },
  deviceReading: {
    marginRight: 20,
    padding: 10,
  },
}

const FermenterInfo = ({ env, classes }: Props) => (
  <Card className={classes.infoCard}>
    <div className={classes.infoDetails}>
      <Avatar>
        <TempIcon />
      </Avatar>
      <CardContent className={classes.deviceReading}>
        <Typography type="headline" component="h3">
          {`${env.temperature}℃`}
        </Typography>
      </CardContent>
      <Avatar>
        <HumIcon />
      </Avatar>
      <CardContent className={classes.deviceReading}>
        <Typography type="headline" component="h3">
          {`${env.humidity}%`}
        </Typography>
      </CardContent>
    </div>
  </Card>
)

export default compose(
  withStyles(fermenterInfoStyles),
  connect(state => ({ env: state.fermenter.env }))
)(FermenterInfo)
