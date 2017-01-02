/* @flow */
import type { State } from '../../common/types';
import Events from './Events';
import React from 'react';
import { connect } from 'react-redux';
import linksMessages from '../../common/app/linksMessages';

import { PageHeader, Title, View } from '../app/components';

const EventsPage = ({ eventHistory }) => (
  <View>
    <Title message={linksMessages.events} />
    <PageHeader description="Past events in chronological order" heading="Event-History" />
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
