import R from 'ramda';
import React, { PropTypes } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { IconButton, Menu } from 'react-mdl/lib';
import { MenuItem } from 'react-mdl/lib/Menu';

const FermenterCommander = () => {
  const { fermenterRts: rts, fermenterStart, fermenterStop } = this.props;
  const maybeShowCurrentCmd = R.defaultTo(' -- ');

  if (R.isEmpty(rts.status)) {
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
      <p style={{ display: 'inline' }}>Current status: [{rts.status}]</p>
      <p style={{ display: 'inline' }}>| Last command: [{maybeShowCurrentCmd(rts.currentCmd)}]</p>
    </div>
  );
};

FermenterCommander.propTypes = {
  fermenterRts: PropTypes.object.isRequired,
  fermenterStart: PropTypes.func.isRequired,
  fermenterStop: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};


export default injectIntl(FermenterCommander);
