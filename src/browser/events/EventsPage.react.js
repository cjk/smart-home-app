import Component from 'react-pure-render/component';
import Events from './Events.react';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';

class Page extends Component {

  static propTypes = {
    smartHome: PropTypes.object,
  };

  render() {
    const { smartHome: { eventHistory: list } } = this.props;

    return (
      <div className="events-page" id="events">
        <FormattedMessage {...linksMessages.events}>
          {message => <Helmet title={message} />}
        </FormattedMessage>
        <Events {...{ list }} />
      </div>
    );
  }
}

export default connect(state => ({
  smartHome: state.smartHome
}))(Page);
