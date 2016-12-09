/* @flow */
import type { State } from '../../common/types';
import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import linksMessages from '../../common/app/linksMessages';
import { Link, Space, Toolbar } from '../app/components';

const styles = {
  toolbar: {
    flexWrap: 'wrap',
  },
  prefetch: {
    display: 'none',
  },
};

const Header = ({ viewer }) => (
  <Toolbar style={styles.toolbar}>
    <Link bold inverted exactly to="/">
      <FormattedMessage {...linksMessages.home} />
    </Link>
    <Space x={2} />

    <Link bold inverted to="/events">
      <FormattedMessage {...linksMessages.events} />
    </Link>
    <Space x={2} />

    <Link bold inverted to="/fermenter">
      <FormattedMessage {...linksMessages.fermenter} />
    </Link>

  </Toolbar>
);

Header.propTypes = {
  viewer: React.PropTypes.object,
};

export default connect(
  (state: State) => ({
    viewer: state.users.viewer,
  }),
)(Header);
