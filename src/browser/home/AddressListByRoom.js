import './AddressListByRoom.scss';
import AddrLine from './AddrLine';
import { List } from 'react-mdl/lib/List';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import React, { PropTypes } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

/* TODO: These are not available as i18n-messages under ./src/common/intl/messages */
const messages = defineMessages({
  'hall-1': {
    defaultMessage: 'Flur-EG',
    id: 'app.rooms.hall-1',
  },
  'hall-2': {
    defaultMessage: 'Flur-DG',
    id: 'app.rooms.hall-2',
  },
  hby: {
    defaultMessage: 'Hobby',
    id: 'app.rooms.hby',
  },
  'cel-1': {
    defaultMessage: 'Keller-1',
    id: 'app.rooms.cel-1',
  },
  'cel-2': {
    defaultMessage: 'Keller-2',
    id: 'app.rooms.cel-2',
  },
  'cel-3': {
    defaultMessage: 'Keller-3',
    id: 'app.rooms.cel-3',
  },
  kit: {
    defaultMessage: 'Küche',
    id: 'app.rooms.kit',
  },
  wz: {
    defaultMessage: 'Wohnzimmer',
    id: 'app.rooms.wz',
  },
  ez: {
    defaultMessage: 'Esszimmer',
    id: 'app.rooms.ez',
  },
  office: {
    defaultMessage: 'Büro',
    id: 'app.rooms.office',
  },
  bath: {
    defaultMessage: 'Bad',
    id: 'app.rooms.bath',
  },
  rest: {
    defaultMessage: 'WC',
    id: 'app.rooms.rest',
  },
  tec: {
    defaultMessage: 'Technik',
    id: 'app.rooms.tec',
  },
  'knd-1': {
    defaultMessage: 'Kind-1',
    id: 'app.rooms.knd-1',
  },
  'knd-2': {
    defaultMessage: 'Kind-2',
    id: 'app.rooms.knd-2',
  },
  'knd-3': {
    defaultMessage: 'Kind-3',
    id: 'app.rooms.knd-3',
  },
});

const AddressList = ({ addresses, actions, prefs }) => {
  const { updateAddr, updateList } = actions;

  /* Tweak MDL styles to allow for more room inside address-text-box */
  const listStyle = {
    marginLeft: 'auto',
  };

  return (
    <section className="addressListByRoom">
    {
      addresses.filter(
        addr => prefs.get('rooms').some(
          /* Only addresses with a valid room + presence in our
             rooms-preferences list */
          roomName => addr.room && addr.room.startsWith(roomName)))
      /* Sort in reverse-alphabetical order */
               .sort((a, b) => a.room < b.room)
               .groupBy(a => a.room)
      /* Convert from map to keyed-sequence, since React currently
         doesn't support iterating Maps */
               .entrySeq()
      /* Create a card for each room... */
               .map(([room, addrLst]) =>
                 <Card className="addrLstByRoomContainer" key={room}>
                   <CardTitle expand>
                     <div className="roomName"><FormattedMessage {...messages[room]} /></div>
                   </CardTitle>
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
};

AddressList.propTypes = {
  actions: PropTypes.object.isRequired,
  addresses: PropTypes.object.isRequired,
  prefs: PropTypes.object.isRequired,
};

export default AddressList;
