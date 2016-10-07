import React from 'react';
import { FormattedMessage } from 'react-intl';
import linksMessages from '../../common/app/linksMessages';
import { Link } from 'react-router';

import { HeaderRow, Navigation } from 'react-mdl/lib/Layout';

const Appbar = () => (
  <HeaderRow>
    <Navigation>
      <Link exactly to="/"><FormattedMessage {...linksMessages.home} /></Link>
      <Link activeClassName="active" to="/events">
        <FormattedMessage {...linksMessages.events} />
      </Link>
    </Navigation>
  </HeaderRow>
);

export default Appbar;
