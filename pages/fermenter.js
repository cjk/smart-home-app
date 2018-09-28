// @flow

import type { FermenterState } from '../types/fermenter'
import type { Dispatch } from '../types'

import * as React from 'react'
import * as fermenterActions from '../lib/fermenter/actions'
import { connect } from 'react-redux'

import AppBar from '../components/AppBar'
import FermenterInfo from '../components/fermenter/FermenterInfo'
import FermenterControl from '../components/fermenter/FermenterControl'
import Paper from '@material-ui/core/Paper'

import { compose } from 'ramda'

type Props = {
  fermenter: FermenterState,
  classes: Object,
  dispatch: Dispatch,
  sendFermenterCmd: Function,
  sendFermenterTempLimits: Function,
  subscribeToState: Function,
  unsubscribeToState: Function,
}

const styles = {
  fermenterRoot: {
    margin: 20,
    padding: 10,
  },
}

class FermenterPage extends React.Component<void, Props> {
  // TODO: No server-side-rendering supported yet :(
  static async getInitialProps(ctx) {
    const { store } = ctx
    return store
  }

  componentDidMount() {
    this.props.subscribeToState()
  }

  componentWillUnmount() {
    this.props.unsubscribeToState()
  }

  render() {
    const { sendFermenterCmd, sendFermenterTempLimits } = this.props

    return (
      <div className="app">
        <AppBar />
        <Paper style={styles.fermenterRoot}>
          <FermenterControl sendFermenterCmd={sendFermenterCmd} sendFermenterTempLimits={sendFermenterTempLimits} />
          <FermenterInfo />
        </Paper>
      </div>
    )
  }
}

export default compose(
  connect(
    null,
    fermenterActions
  )
)(FermenterPage)
