import './TempHumidity.scss';

import cx from 'classnames';
import React from 'react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';

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
  const env = fermenterState.get('env');
  const devices = fermenterState.get('devices');

  if (!env.createdAt) {
    return (<div>No information yet...</div>);
  }

  return (
    <div id="fermenterEnv">
      <h4>Environment (iteration #{env.iterations}):</h4>
      <p><FormattedMessage {...messages.temperature} />: {env.temperature}</p>
      <p><FormattedMessage {...messages.humidity} />: {env.humidity}</p>
      <hr />
      {
        devices.entrySeq().map(([key, dev]) => (
          <section className="fermDevice" key={key}>
            <h4 className="fermDevHeader">{key}:</h4>
            <p className="fermDevStatusLine">{key} is currently [<span className={cx('fermDevStatus', { fermDevStatusOn: dev.isOn })}>{dev.isOn ? 'running' : 'off'}</span>]</p>
          </section>
        ))
      }
      <hr />
    </div>
  );
};

TempHumidity.propTypes = {
  fermenterState: React.PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(TempHumidity);
