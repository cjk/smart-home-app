/* @flow */
import React from 'react';
import { GoHome, GoDiff, GoHubot, GoHistory } from 'react-icons/lib/go';
import { injectIntl } from 'react-intl';
import linksMessages from '../../common/app/linksMessages';
import { Link, Space, Toolbar, Tooltip } from '../components';

const styles = {
  toolbar: {
    flexWrap: 'wrap',
  },
  prefetch: {
    display: 'none',
  },
};

const activeStyle = {
  color: 'hsla(214, 100%, 84%, 1)',
};

type HeaderProps = {
  intl: any,
};

const Header = ({ intl }: HeaderProps) => (
  <Toolbar style={styles.toolbar}>
    <Link inverted to="/rooms">
      <GoHome size="2em" />
    </Link>
    <Space auto />

    <Link inverted activeStyle={activeStyle} exactly to="/">
      <Tooltip title={intl.formatMessage(linksMessages.listByState)}>
        <GoDiff size="2em" />
      </Tooltip>
    </Link>
    <Space px={1} />

    <Link inverted activeStyle={activeStyle} to="/events">
      <Tooltip title={intl.formatMessage(linksMessages.events)}>
        <GoHistory size="2em" />
      </Tooltip>
    </Link>
    <Space px={1} />

    <Link inverted activeStyle={activeStyle} to="/fermenter">
      <Tooltip title={intl.formatMessage(linksMessages.fermenter)}>
        <GoHubot size="2em" />
      </Tooltip>
    </Link>
  </Toolbar>
);

export default injectIntl(Header);
