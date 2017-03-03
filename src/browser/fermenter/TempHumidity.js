/* @flow */
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import { Flex, Box } from 'reflexbox';
import {
  Panel,
  PanelHeader,
  Stat,
  Text,
} from '../components';

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

const TempHumidity = ({ fermenterState }) => {
  const { env, devices } = fermenterState;

  const content = !env.createdAt ? (
    <Flex>
      <Text small>No status yet...</Text>
    </Flex>
  ) : (
    <Flex column>
      <Box p={1}>
        <Text small>Fermenter-cycle #{env.iterations} - {distanceInWordsToNow(env.createdAt, { includeSeconds: true })} ago:</Text>
      </Box>

      <Flex justify="space-between" wrap>
        <Stat label="Temp" unit="C" value={env.temperature} />
        <Stat label="Hum" unit="%" value={env.humidity} />
      </Flex>
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
