import './Home.less';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import R from 'ramda';
import React, {PropTypes} from 'react';
import {Switch} from 'react-mdl';
import {requestInitialState} from '../../common/home/actions';

export default class Page extends Component {

  static propTypes = {
    // Why not PropTypes.object.isRequired? Because:
    // https://github.com/rackt/react-router/issues/1505
    actions: PropTypes.object,
    msg: PropTypes.object,
    smartHome: PropTypes.object
  }

  // Fetch initial state only server-side
  static fetchActions = [requestInitialState];

  render() {
    console.log('Live-state: ', this.props.smartHome.livestate.toJS());

    const {msg: {home: msg}, smartHome: {livestate}, actions: {writeGroupAddr: updateAddr}} = this.props,
      toggleAddrVal = (addr) => addr.set('value', !addr.value | 0);

    const addrLine = livestate.map(addr => {
      /* DEBUG */
      /* console.log(`RENDER: ${addr.id} = ${addr.value} `); */

      /* TODO: This should be considered a HACK but works for now: */
      return (
        <section className='row' key={addr.id}>
          <div className='col-xs-2'>
            <span className='box'>{addr.id}</span>
          </div>
          <div className='col-xs-6'>
            <span className='box'>{addr.name}</span>
          </div>
          <div className='col-xs-2'>
            <span className='box'>{R.isNil(addr.value) ? '???' : addr.value}</span>
          </div>
          <div className='col-xs-2'>
            <span className='box'>
              <Switch checked={!!addr.value} id={addr.id} onChange={() => updateAddr(toggleAddrVal(addr.set('type', 'DPT3')))}/>
            </span>
          </div>
        </section>
      );
    });

    return (
      <div className='home-page' id='home'>
        <Helmet title={msg.title} />
        <section className='device-switch-list'>
          {addrLine}
        </section>
      </div>
    );
  }

}
