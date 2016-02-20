import './AddressList.less';
import AddrLine from './AddrLine.react';
import React, {PropTypes} from 'react';
import Component from 'react-pure-render/component';
import {connect} from 'react-redux';

class AddressList extends Component {

  static propTypes = {
    addressList: PropTypes.object,
    msg: PropTypes.object,
  };

  render() {

    const {addressList, msg} = this.props;

    return (
      <section className="device-switch-list">
      {addressList.map(address =>
        <AddrLine {...{msg, address}} key={address.id} />
      )
      }
      </section>
    );
  }
}

export default connect(state => ({
  msg: state.intl.msg.home, /* PENDING: don't use this, create your own subtree in en.js */
}))(AddressList);
