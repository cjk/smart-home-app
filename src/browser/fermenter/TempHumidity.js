/* @flow */
import type FermenterState from '../../common/fermenter/fermenterState';
import React from 'react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';

import { Flex, Box } from 'reflexbox';
import {
  Panel,
  PanelHeader,
  Space,
  Text,
} from '../app/components';

const messages = defineMessages({
  environment: {
    defaultMessage: 'Environment',
    id: 'fermenter.environment',
  },
  temperature: {
    defaultMessage: 'Temperature',
    id: 'fermenter.temperature',
  },
  humidity: {
    defaultMessage: 'Humidity',
    id: 'fermenter.Humidity',
  },
});

const TempHumidity = ({ fermenterState }: FermenterState) => {
  const { env, devices } = fermenterState;

  const content = !env.createdAt ? (
    <Flex>
      <Text small>No status yet...</Text>
    </Flex>
  ) : (
    <Flex>
      <Text small>Cycle #{env.iterations}</Text>
      <Text small children="TODO..." />
      <Space auto />
      <Text small children="TODO..." />
    </Flex>
  );

  return (
    <Panel theme="secondary">
      <PanelHeader>Status</PanelHeader>
      { content }
    </Panel>
  );
};

TempHumidity.propTypes = {
  fermenterState: React.PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(TempHumidity);
