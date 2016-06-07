import './AddressList.scss';
import AddrLine from './AddrLine.react';
import Button from 'react-mdl/lib/Button';
import { List } from 'react-mdl/lib/List';
import { Card, CardTitle, CardText, CardMenu } from 'react-mdl/lib/Card';

import * as addressActions from '../../common/home/actions';
import React, { PropTypes } from 'react';
import Component from 'react-pure-render/component';
import { connect } from 'react-redux';

class AddressList extends Component {

  static propTypes = {
    addresses: PropTypes.object.isRequired,
    requestInitialState: PropTypes.func.isRequired,
    writeGroupAddr: PropTypes.func.isRequired
  }

  updateAddr = (addr) => {
    const toggleAddrVal = (addr) => addr.set('value', !addr.value | 0);
    const { writeGroupAddr } = this.props;
    return writeGroupAddr(toggleAddrVal(addr.set('type', 'DPT3')));
  }

  updateList = () => {
    const { requestInitialState } = this.props;
    return requestInitialState();
  }

  render() {
    const { addresses } = this.props;
    const updateAddr = this.updateAddr;

    return (
      <section className="addressList">
        <Card className="addrLstContainer">
          <CardTitle expand>Device list</CardTitle>
          <CardMenu className="addrLstActions">
            <Button colored className="listRefresher">
              <i className="material-icons" onClick={this.updateList}>update</i>
            </Button>
          </CardMenu>
          <CardText className="addrLstBody">
            <List>
              {
                addresses.sortBy(addr => addr.name)
                         .sortBy(addr => !addr.value)
                         .map(address =>
                           <AddrLine {...{ address, updateAddr }} key={address.id} />
                         )
              }
            </List>
          </CardText>
        </Card>
      </section>
    );
  }
}

export default connect(null, addressActions)(AddressList);
