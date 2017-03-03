/* @flow */
import type { State } from '../../common/types';
import Events from './Events';
import React from 'react';
import { connect } from 'react-redux';
import linksMessages from '../../common/app/linksMessages';

import { Title, View } from '../components';

const EventsPage = ({ eventHistory }) => (
  <View>
    <Title message={linksMessages.events} />
    <Events {...{ eventHistory }} />
  </View>
);

EventsPage.propTypes = {
  eventHistory: React.PropTypes.array.isRequired,
};

export default connect(
  (state: State) => ({
    eventHistory: state.smartHome.eventHistory,
  })
)(EventsPage);
