import './AddressList.less';
import AddrLine from './AddrLine.react';
import React, { PropTypes } from 'react';
import Component from 'react-pure-render/component';
import { connect } from 'react-redux';
import { List } from 'react-mdl/lib/List';

class AddressList extends Component {

  static propTypes = {
    addresses: PropTypes.object.isRequired,
    msg: PropTypes.object,
  };

  render() {
    const { addresses, msg } = this.props;

    return (
      <List>
      <h5>Device-list:</h5>
      {
        addresses.sortBy(addr => addr.name)
                 .sortBy(addr => !addr.value)
                 .map(address =>
                   <AddrLine {...{ msg, address }} key={address.id} />
                 )
      }
      </List>
    );
  }
}

export default connect(state => ({
  msg: state.intl.msg.home, /* PENDING: don't use this, create your own subtree in en.js */
}))(AddressList);
