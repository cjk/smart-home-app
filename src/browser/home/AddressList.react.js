import './AddressList.scss';
import AddrLine from './AddrLine.react';
import FABButton from 'react-mdl/lib/FABButton';
import { List } from 'react-mdl/lib/List';
import Grid, { Cell } from 'react-mdl/lib/Grid';

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
      <List className="addressList">
        <Grid shadow={4} className="header">
          <Cell col={10}>
            <h5>Device-list</h5>
          </Cell>
          <Cell col={2}>
            <FABButton mini>
              <i className="material-icons listRefresher" onClick={this.updateList}>update</i>
            </FABButton>
          </Cell>
        </Grid>
        {
          addresses.sortBy(addr => addr.name)
                   .sortBy(addr => !addr.value)
                   .map(address =>
                     <AddrLine {...{ address, updateAddr }} key={address.id} />
                   )
        }
      </List>
    );
  }
}

export default connect(null, addressActions)(AddressList);
