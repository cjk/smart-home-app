import R from 'ramda';
import React, { PropTypes } from 'react';
import { ListItem, ListItemContent, ListItemAction } from 'react-mdl/lib/List';
import { Switch } from 'react-mdl/lib';
import * as addrLineActions from '../../common/home/actions';
import Component from 'react-pure-render/component';
import { connect } from 'react-redux';

class AddrLine extends Component {

  static propTypes = {
    address: PropTypes.object.isRequired,
    msg: PropTypes.object,
    writeGroupAddr: PropTypes.func.isRequired
  };

  render() {
    const { writeGroupAddr: updateAddr, address: addr } = this.props;
    const toggleAddrVal = (addr) => addr.set('value', !addr.value | 0);
    const switchable = (addr) => addr.func === 'light';

    return (
      <ListItem className="addressRow">
        <ListItemContent>{addr.name}</ListItemContent>
        <ListItemAction info={R.isNil(addr.value) ? '???' : addr.value.toString()}>
          <Switch ripple checked={!!addr.value} disabled={!switchable(addr)} id={addr.id} onChange={() => updateAddr(toggleAddrVal(addr.set('type', 'DPT3')))} />
        </ListItemAction>
      </ListItem>
    );
  }
}

export default connect(state => ({
  msg: state.intl.msg.home
}), addrLineActions)(AddrLine);
