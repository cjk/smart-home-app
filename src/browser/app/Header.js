/* @flow */
import type { State, User } from '../../common/types';
import React from 'react';
import { GoHome, GoHistory } from 'react-icons/lib/go';
import { connect } from 'react-redux';
import { compose } from 'ramda';
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

type HeaderProps = {
  viewer: ?User,
};

const Header = ({
  viewer
}: HeaderProps) => (
  <Toolbar style={styles.toolbar}>
    <Link bold inverted exactly to="/">
      <GoHome size="2em" />
    </Link>
    <Space px={2} />
    <Link inverted to={{ pathname: '/', query: { listStyle: 'byState' } }}>
      <FormattedMessage {...linksMessages.home} />
    </Link>
    <Space auto />

    <Link inverted to={{ pathname: '/', query: { listStyle: 'byRoom' } }}>
      <FormattedMessage {...linksMessages.listByRoom} />
    </Link>
    <Space px={2} />

    <Link bold inverted to="/events">
      <GoHistory size="2em" />
    </Link>
    <Space px={2} />

    <Link bold inverted to="/fermenter">
      <FormattedMessage {...linksMessages.fermenter} />
    </Link>
  </Toolbar>
);

export default compose(
  connect(
    (state: State) => ({
      viewer: state.users.viewer,
    }),
  )
)(Header);
