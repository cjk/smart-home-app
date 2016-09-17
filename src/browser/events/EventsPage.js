import Events from './Events';
import Helmet from 'react-helmet';
import React from 'react';
import { connect } from 'react-redux';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';

const EventsPage = ({ eventlist }) => {
  return (
    <div className="events-page" id="events">
      <FormattedMessage {...linksMessages.events}>
        {message => <Helmet title={message} />}
      </FormattedMessage>
      <Events {...{ eventlist }} />
    </div>
  );
};


EventsPage.propTypes = {
  eventlist: React.PropTypes.object,
};

export default connect(state => ({
  eventlist: state.smartHome.eventHistory,
}))(EventsPage);
