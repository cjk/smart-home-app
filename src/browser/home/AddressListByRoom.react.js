import './AddressListByRoom.scss';
import AddrLine from './AddrLine.react';
import { List } from 'react-mdl/lib/List';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import React, { PropTypes } from 'react';
import Component from 'react-pure-render/component';
import { connect } from 'react-redux';

class AddressList extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    addresses: PropTypes.object.isRequired,
    prefs: PropTypes.object.isRequired,
  }

  render() {
    const { addresses, prefs } = this.props;
    const { updateAddr, updateList } = this.props.actions;

    /* Tweak MDL styles to allow for more room inside address-text-box */
    const listStyle = {
      marginLeft: 'auto'
    };

    return (
      <section className="addressListByRoom">
      {
        addresses.filter(
          addr => prefs.rooms.some(
            /* Only addresses with a valid room + in our rooms-preferences list */
            roomName => addr.room && addr.room.startsWith(roomName)))
                 /* Sort in reverse-alphabetical order */
                 .sort((a, b) => a.room < b.room)
                 .groupBy(a => a.room)
                 /* Convert from map to keyed-sequence, since React currently doesn't support iterating Maps */
                 .entrySeq()
                  /* Create a card for each room... */
                 .map(([room, addrLst]) =>
                   <Card className="addrLstByRoomContainer" key={room}>
                     <CardTitle expand>{room}</CardTitle>
                     <CardText className="addrLstBody">
                       {/* ...and fill it with addresses belonging to this room */}
                       <List style={listStyle}>
                         {
                           addrLst.sortBy(addr => addr.name)
                                  .sortBy(addr => !addr.value)
                                  .map(address =>
                                    <AddrLine {...{ address, updateAddr }} key={address.id} />
                                  )
                         }
                       </List>
                     </CardText>
                   </Card>
                 )
      }
      </section>
    );
  }
}

export default connect()(AddressList);
