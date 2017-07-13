// @flow
import React from 'react';
import Avatar from 'material-ui/Avatar';
import Card, { CardContent } from 'material-ui/Card';
import HeaterIcon from 'material-ui-icons/AcUnit';
import HumidifierIcon from 'material-ui-icons/Cloud';
import { green, grey } from 'material-ui/styles/colors';

type Props = {
  name: string,
  isOn: boolean,
};

const FermenterDevice = ({ name, isOn }: Props) => {
  const colorByState = isOn => ({
    color: '#fff',
    background: isOn ? green[500] : grey[500],
  });

  return (
    <Card>
      <CardContent>
        <Avatar style={colorByState(isOn)}>
          {name === 'heater' ? <HeaterIcon /> : <HumidifierIcon />}
        </Avatar>
      </CardContent>
    </Card>
  );
};

export default FermenterDevice;
