import R from 'ramda';
import React, { PropTypes } from 'react';
import { ListItem, ListItemContent, ListItemAction } from 'react-mdl/lib/List';
import { Switch } from 'react-mdl/lib';

/* Presentational component to render address-list lines */
const AddrLine = ({ address, updateAddr }) => {
  const switchable = (addr) => addr.type === 'switch';

  /* Tweak MDL styles so address-name + id fit into main-content area */
  const addressLineText = {
    lineHeight: '1.2em',
  };

  /* Decides which action-item to display */
  const chooseIcon = (addr) => {
    switch (addr.func) {
      case 'light': return 'wb_incandescent';
      case 'shut': return 'web_asset';
      case 'outlet': return 'power';
      case 'scene': return 'wb_iridescent';
      default: return 'all_inclusive';
    }
  };

  return (
    <ListItem twoLine className="addressRow">
      <ListItemContent avatar={chooseIcon(address)} subtitle={address.id} style={addressLineText}>{address.name}</ListItemContent>
      <ListItemAction info={R.isNil(address.value) ? '???' : address.value.toString()}>
        <Switch ripple checked={!!address.value} disabled={!switchable(address)} id={address.id} onChange={() => updateAddr(address)} />
      </ListItemAction>
    </ListItem>
  );
};

AddrLine.propTypes = {
  address: PropTypes.object.isRequired,
  msg: PropTypes.object,
  updateAddr: PropTypes.func.isRequired,
};

export default AddrLine;
