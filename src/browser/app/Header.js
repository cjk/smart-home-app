/* @flow */
import type { State } from '../../common/types';
import type { RunTimeState } from '../../common/fermenter/types';
import React from 'react';
import { GoHome, GoHistory } from 'react-icons/lib/go';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { FormattedMessage } from 'react-intl';
import linksMessages from '../../common/app/linksMessages';
import { Link, Space, Toolbar } from '../components';

const styles = {
  toolbar: {
    flexWrap: 'wrap',
  },
  prefetch: {
    display: 'none',
  },
};

type HeaderProps = {
  fermenterRuntime: ?RunTimeState,
};

const Header = ({
  fermenterRuntime
}: HeaderProps) => (
  <Toolbar style={styles.toolbar}>
    <Link inverted to="/">
      <GoHome size="2em" />
    </Link>
    <Space px={2} />
    <Link inverted to="/">
      <FormattedMessage {...linksMessages.home} />
    </Link>
    <Space auto />

    <Link inverted to="/rooms">
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
      fermenterRuntime: state.fermenter.rts,
    }),
  )
)(Header);
