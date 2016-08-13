import R from 'ramda';
import React, { PropTypes } from 'react';
import { ListItem, ListItemContent, ListItemAction } from 'react-mdl/lib/List';
import { Switch } from 'react-mdl/lib';
import Component from 'react-pure-render/component';

/* Presentational component to render address-list lines */
class AddrLine extends Component {

  static propTypes = {
    address: PropTypes.object.isRequired,
    msg: PropTypes.object,
    updateAddr: PropTypes.func.isRequired,
  }

  /* Note how we make use of autobinding here
     (https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding)
     to allow using `this` */
  onSwitchToggle = () => {
    const { updateAddr, address } = this.props;

    updateAddr(address);
  }

  render() {
    const { address } = this.props;
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
          <Switch ripple checked={!!address.value} disabled={!switchable(address)} id={address.id} onChange={this.onSwitchToggle} />
        </ListItemAction>
      </ListItem>
    );
  }
}

export default AddrLine;
