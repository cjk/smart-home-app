/* @flow */
import type { State } from '../../common/types';
import React from 'react';
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

class FermenterPage extends React.Component {

  static propTypes = {
    fermenter: React.PropTypes.object.isRequired,
    subscribeToState: React.PropTypes.func.isRequired,
    unsubscribeToState: React.PropTypes.func.isRequired,
    processState: React.PropTypes.func.isRequired,
    sendFermenterCmd: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { subscribeToState } = this.props;
    subscribeToState();
  }

  componentWillUnmount() {
    const { unsubscribeToState } = this.props;
    unsubscribeToState();
  }

  render() {
    const { fermenter, sendFermenterCmd } = this.props;

    return (
      <View>
        <Title message={linksMessages.fermenter} />
        <PageHeader description="Fermenter Remote Control" heading="Fermenter" />
        <Flex wrap gutter={1}>
          <Box p={2}>
            <Commander fermenterState={fermenter} sendFermenterCmd={sendFermenterCmd} />
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
