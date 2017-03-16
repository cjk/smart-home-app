/* @flow */
import React from 'react';
import { GoHome, GoDiff, GoHubot, GoHistory } from 'react-icons/lib/go';
import { FormattedMessage, injectIntl } from 'react-intl';
import linksMessages from '../../common/app/linksMessages';
import { Link, Space, Text, Toolbar, Tooltip } from '../components';

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
    <Space px={2} />
    <Text>
      <FormattedMessage {...linksMessages.home} />
    </Text>
    <Space auto />

    <Link inverted activeStyle={activeStyle} exactly to="/">
      <Tooltip title={intl.formatMessage(linksMessages.listByState)}>
        <GoDiff size="2em" />
      </Tooltip>
    </Link>
    <Space px={2} />

    <Link inverted activeStyle={activeStyle} to="/events">
      <Tooltip title={intl.formatMessage(linksMessages.events)}>
        <GoHistory size="2em" />
      </Tooltip>
    </Link>
    <Space px={2} />

    <Link inverted activeStyle={activeStyle} to="/fermenter">
      <Tooltip title={intl.formatMessage(linksMessages.fermenter)}>
        <GoHubot size="2em" />
      </Tooltip>
    </Link>
  </Toolbar>
);

export default injectIntl(Header);
