import Component from 'react-pure-render/component';
import R from 'ramda';
import React, { PropTypes } from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { IconButton, Menu } from 'react-mdl/lib';
import { MenuItem } from 'react-mdl/lib/Menu';

class FermenterCommander extends Component {

  static propTypes = {
    fermenterStatus: PropTypes.string.isRequired,
    fermenterStart: PropTypes.func.isRequired,
    fermenterStop: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  render() {
    const { fermenterStatus: status, fermenterStart, fermenterStop } = this.props;

    if (R.empty(status)) {
      return (<div>No status yet...</div>);
    }

    return (
      <div style={{ position: 'relative' }}>
        <IconButton name="more_vert" id="fermenter_menu_upper_left" />
        <Menu target="fermenter_menu_upper_left" >
          <MenuItem onClick={fermenterStart}>Switch fermenter on</MenuItem>
          <MenuItem onClick={fermenterStop}>Switch fermenter off</MenuItem>
          <MenuItem disabled>Emergency off</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default injectIntl(FermenterCommander);
