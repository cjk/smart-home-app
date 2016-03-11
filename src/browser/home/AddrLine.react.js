import R from 'ramda';
import React, { PropTypes } from 'react';
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
      <section className="row">
        <div className="col-xs-offset-1 col-xs-2">
          <span className="box">{addr.id}</span>
        </div>
        <div className="col-xs-5">
          <span className="box">{addr.name}</span>
        </div>
        <div className="col-xs-1">
          <span className="box">{R.isNil(addr.value) ? '???' : addr.value}</span>
        </div>
        <div className="col-xs-2">
          <span className="box">
            <Switch checked={!!addr.value} disabled={!switchable(addr)} id={addr.id} onChange={() => updateAddr(toggleAddrVal(addr.set('type', 'DPT3')))} />
          </span>
        </div>
      </section>
    );
  }
}

export default connect(state => ({
  msg: state.intl.msg.home
}), addrLineActions)(AddrLine);
