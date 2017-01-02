/* @flow */
import type { State } from '../../common/types';
import React, { Component, PropTypes } from 'react';
import smartHomeConnect from '../../common/home/connector';
import * as fermenterActions from '../../common/fermenter/actions';
import TempHumidityInfo from './TempHumidity';
import Commander from './Commander';
import { connect } from 'react-redux';
import linksMessages from '../../common/app/linksMessages';

import { Flex, Box } from 'reflexbox';
import {
  PageHeader,
  Title,
  View,
} from '../app/components';

class FermenterPage extends Component {

  static propTypes = {
    fermenter: PropTypes.object.isRequired,
    processState: PropTypes.func.isRequired,
    sendFermenterCmd: PropTypes.func.isRequired,
  };

  /* TODO: Refactor out in HOC + action */
  componentDidMount() {
    const { processState } = this.props;
    const { subscribeToFermenterState } = smartHomeConnect();

    subscribeToFermenterState(processState);
  }

  render() {
    const { fermenter, sendFermenterCmd } = this.props;

    return (
      <View>
        <Title message={linksMessages.fermenter} />
        <PageHeader description="Fermenter Remote Control" heading="Fermenter" />
        <Flex flexAuto gutter={1}>
          <Box p={2}>
            <Commander runtimeState={fermenter.rts} sendFermenterCmd={sendFermenterCmd} />
          </Box>
          <Box p={2}>
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
  }), fermenterActions,
)(FermenterPage);
