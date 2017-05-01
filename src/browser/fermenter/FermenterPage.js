/* @flow */
import type { State } from '../../common/types';
import type { FermenterState } from '../../common/fermenter/types';
import React from 'react';
import * as fermenterActions from '../../common/fermenter/actions';
import TempHumidityInfo from './TempHumidity';
import Commander from './Commander';
import { connect } from 'react-redux';

import { Flex, Box } from 'reflexbox';
import { View } from '../components';

type props = {
  fermenter: FermenterState,
  subscribeToState: Function,
  unsubscribeToState: Function,
  processState: Function,
  sendFermenterCmd: Function,
  sendFermenterTempLimits: Function,
};

class FermenterPage extends React.Component<void, props, void> {
  componentDidMount() {
    const { subscribeToState } = this.props;
    subscribeToState();
  }

  componentWillUnmount() {
    const { unsubscribeToState } = this.props;
    unsubscribeToState();
  }

  render() {
    const { fermenter, sendFermenterCmd, sendFermenterTempLimits } = this.props;

    return (
      <View>
        <Flex wrap align="center">
          <Box auto px={2} py={1}>
            <Commander
              fermenterState={fermenter}
              sendFermenterCmd={sendFermenterCmd}
              sendFermenterTempLimits={sendFermenterTempLimits}
            />
          </Box>
          <Box auto px={2} py={1}>
            <TempHumidityInfo fermenterState={fermenter} />
          </Box>
        </Flex>
      </View>
    );
  }
}

export default connect(
  (state: State) => ({
    fermenter: state.fermenter,
  }),
  fermenterActions
)(FermenterPage);
