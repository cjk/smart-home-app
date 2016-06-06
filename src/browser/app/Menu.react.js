import Component from 'react-pure-render/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import linksMessages from '../../common/app/linksMessages';
import { Link } from 'react-router';

import { Drawer, Navigation } from 'react-mdl/lib/Layout';

export default class AppMenu extends Component {

  render() {
    return (
      <Drawer title="Menu">
        <Navigation>
          <Link to="/fermenter"><FormattedMessage {...linksMessages.fermenter} /></Link>
        </Navigation>
      </Drawer>
    );
  }
}
