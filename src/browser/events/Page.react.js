import Component from 'react-pure-render/component';
import Events from './Events.react';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import linksMessages from '../../common/app/linksMessages';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

class Page extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    smartHome: PropTypes.object,
  };

  render() {
    const { intl, smartHome: { eventHistory: list } } = this.props;
    const title = intl.formatMessage(linksMessages.events);

    return (
      <div className="events-page" id="events">
        <Helmet title={ title } />
        <Events {...{ list }} />
      </div>
    );
  }
}

Page = injectIntl(Page);

export default connect(state => ({
  smartHome: state.smartHome
}))(Page);
