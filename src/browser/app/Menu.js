/* @flow */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import linksMessages from '../../common/app/linksMessages';
import { Link } from '../app/components';

import { Drawer, Navigation } from 'react-mdl/lib/Layout';

const AppMenu = () => (
  <Drawer title="Menu">
    <Navigation>
      <Link to="/fermenter"><FormattedMessage {...linksMessages.fermenter} /></Link>
    </Navigation>
  </Drawer>
);

export default AppMenu;
