import React from 'react';
import { FormattedMessage } from 'react-intl';
import linksMessages from '../../common/app/linksMessages';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { HeaderRow, Navigation } from 'react-mdl/lib/Layout';

const Appbar = ({ viewer }) => {
  return (
    <HeaderRow>
      <Navigation>
        <Link to="/"><FormattedMessage {...linksMessages.home} /></Link>
        <Link activeClassName="active" to="/events">
          <FormattedMessage {...linksMessages.events} />
        </Link>
      </Navigation>
    </HeaderRow>
  );
};

Appbar.propTypes = {
  viewer: React.PropTypes.object,
};

export default connect(state => ({
  viewer: state.users.viewer,
}))(Appbar);
