import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import linksMessages from '../../common/app/linksMessages';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { HeaderRow, Navigation } from 'react-mdl/lib/Layout';

class Appbar extends Component {

  static propTypes = {
    pathname: PropTypes.string.isRequired,
    viewer: PropTypes.object
  };

  render() {
    const { viewer } = this.props;

    return (
      <HeaderRow>
        <Navigation>
          <Link to="/"><FormattedMessage {...linksMessages.home} /></Link>
          <Link activeClassName="active" to="/rooms">
            <FormattedMessage {...linksMessages.rooms} />
          </Link>
          <Link activeClassName="active" to="/events">
            <FormattedMessage {...linksMessages.events} />
          </Link>
        </Navigation>
      </HeaderRow>
    );
  }
}

export default connect(state => ({
  viewer: state.users.viewer
}))(Appbar);
