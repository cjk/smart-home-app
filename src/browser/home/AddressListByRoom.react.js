// import './AddressRoomList.scss';
// import AddrLine from './AddrLine.react';
import Button from 'react-mdl/lib/Button';
import { List } from 'react-mdl/lib/List';
import { Card, CardTitle, CardText, CardMenu } from 'react-mdl/lib/Card';
import React, { PropTypes } from 'react';
import Component from 'react-pure-render/component';
import { connect } from 'react-redux';

class AddressList extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    addresses: PropTypes.object.isRequired
  }

  render() {
    const { addresses } = this.props;
    const { updateAddr, updateList } = this.props.actions;

    return (
      <section className="addressListByRoom">
        <Card className="addrLstByRoomContainer">
          <CardTitle expand>Rooms</CardTitle>
          <CardMenu className="addrLstActions">
            <Button colored className="listRefresher">
              <i className="material-icons" onClick={updateList}>update</i>
            </Button>
          </CardMenu>
          <CardText className="addrLstBody">
            <List>
              {
                addresses.filter(addr => !!addr.room)
                         .map(address =>
                           <p key={address.id}>Room: {address.room}, Name: {address.name}</p>
                         )
              }
            </List>
          </CardText>
        </Card>
      </section>
    );
  }
}

export default connect()(AddressList);
