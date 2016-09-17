import Events from './Events';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';

const EventsPage = () => {
  const { smartHome: { eventHistory: list } } = this.props;

  return (
    <div className="events-page" id="events">
      <FormattedMessage {...linksMessages.events}>
        {message => <Helmet title={message} />}
      </FormattedMessage>
      <Events {...{ list }} />
    </div>
  );
};


EventsPage.propTypes = {
  smartHome: PropTypes.object,
};

export default connect(state => ({
  smartHome: state.smartHome,
}))(EventsPage);
