import R from 'ramda';
import React, { PropTypes } from 'react';
import { ListItem, ListItemContent, ListItemAction } from 'react-mdl/lib/List';
import { Switch } from 'react-mdl/lib';
import Component from 'react-pure-render/component';
import { connect } from 'react-redux';

/* Presentational component to render address-list lines */
class AddrLine extends Component {

  static propTypes = {
    address: PropTypes.object.isRequired,
    msg: PropTypes.object,
    updateAddr: PropTypes.func.isRequired
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
    const switchable = (addr) => addr.func === 'light';

    return (
      <ListItem className="addressRow">
        <ListItemContent>{address.name}</ListItemContent>
        <ListItemAction info={R.isNil(address.value) ? '???' : address.value.toString()}>
          <Switch ripple checked={!!address.value} disabled={!switchable(address)} id={address.id} onChange={this.onSwitchToggle} />
        </ListItemAction>
      </ListItem>
    );
  }

}

export default connect(state => ({
  msg: state.intl.msg.home
}))(AddrLine);
