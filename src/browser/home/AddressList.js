import './AddressList.scss';
import AddrLine from './AddrLine';
import Button from 'react-mdl/lib/Button';
import { List } from 'react-mdl/lib/List';
import { Card, CardTitle, CardText, CardMenu } from 'react-mdl/lib/Card';
import React, { PropTypes } from 'react';

const AddressList = ({ addresses, actions }) => {
  const { updateAddr, updateList } = actions;

  return (
    <section className="addressList">
      <Card className="addrLstContainer">
        <CardTitle expand>Device list</CardTitle>
        <CardMenu className="addrLstActions">
          <Button colored className="listRefresher">
            <i className="material-icons" onClick={updateList}>update</i>
          </Button>
        </CardMenu>
        <CardText className="addrLstBody">
          <List>
            {
              addresses.sortBy(addr => addr.name)
                       .sortBy(addr => !addr.value)
                       .map(address =>
                         <AddrLine {...{ address, updateAddr }} key={address.get('id')} />
                       )
            }
          </List>
        </CardText>
      </Card>
    </section>
  );
};

AddressList.propTypes = {
  actions: PropTypes.object.isRequired,
  addresses: PropTypes.object.isRequired,
};

export default AddressList;
