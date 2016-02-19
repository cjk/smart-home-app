import R from 'ramda';
import React, {PropTypes} from 'react';
import {Switch} from 'react-mdl/lib';

import Component from 'react-pure-render/component';

export default class AddrLine extends Component {

  static propTypes = {
    actions: PropTypes.object,
    address: PropTypes.object,
    msg: PropTypes.object
  };

  render() {

    const {actions: {writeGroupAddr: updateAddr}, address: addr} = this.props;
    const toggleAddrVal = (addr) => addr.set('value', !addr.value | 0);
    const switchable = (addr) => addr.func === 'light';

    return (
      <section className="row">
        <div className="col-xs-2">
          <span className="box">{addr.id}</span>
        </div>
        <div className="col-xs-6">
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
