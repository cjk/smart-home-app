import './AddressList.less';
import AddrLine from './AddrLine.react';
import React, {PropTypes} from 'react';
import Component from 'react-pure-render/component';

export default class AddressList extends Component {

  static propTypes = {
    actions: PropTypes.object,
    addressList: PropTypes.object,
    msg: PropTypes.object,
  };

  render() {

    const {actions, addressList, msg} = this.props;

    return (
      <section className="device-switch-list">
        {addressList.map(address =>
          <AddrLine {...{actions, msg, address}} key={address.id} />
         )
        }
      </section>
    );
  }
}
