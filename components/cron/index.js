// @flow

// Container-component for interactions with smart-home (cron-) jobs.

import type { Action, Dispatch, Cronjobs as CronjobArray } from '../../types'

import * as React from 'react'
import { connect } from 'react-redux'
import { compose, filter, isEmpty, map } from 'ramda'
import CronjobCard from './CronjobCard'

type Props = {
  cronjobs: CronjobArray,
  dispatch: Dispatch,
}

const dailyJobs = cronjobs => filter(j => j.repeat === 'daily')(cronjobs)

class Cronjobs extends React.Component<Props> {
  componentDidMount() {
    const { dispatch, cronjobs } = this.props
    // client-only actions to perform: fetching cronjobs from cloud if not already done so
    if (isEmpty(cronjobs)) dispatch(({ type: 'FETCH_CRONJOBS' }: Action))
  }

  render() {
    const { cronjobs } = this.props

    return (
      <div className="cronjobLst">
        {map(
          cronjob => (
            <CronjobCard key={cronjob.jobId} cronjob={cronjob} />
          ),
          dailyJobs(cronjobs)
        )}
      </div>
    )
  }
}

export default compose(
  connect(state => ({
    cronjobs: state.smartHome.cronjobs,
  }))
)(Cronjobs)
