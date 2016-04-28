import Component from 'react-pure-render/component';
import React from 'react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages({
  environment: {
    defaultMessage: 'Environment',
    id: 'fermenter.environment'
  },
  temperature: {
    defaultMessage: 'Temperature',
    id: 'fermenter.temperature'
  },
  humidity: {
    defaultMessage: 'Humidity',
    id: 'fermenter.Humidity'
  },
});

class TempHumidity extends Component {

  static propTypes = {
    state: React.PropTypes.object.isRequired,
    intl: intlShape.isRequired,
  };

  render() {
    const { state } = this.props;

    const env = state.get('env');
    const devices = state.get('devices');
    const { heater, humidifier } = devices;

    if (!env.createdAt) {
      return (<div>No information yet...</div>);
    }

    return (
      <div>
        <h4>Environment (iteration #{env.iterations}):</h4>
        <p><FormattedMessage {...messages.temperature} />: {env.temperature}</p>
        <p><FormattedMessage {...messages.humidity} />: {env.humidity}</p>
        <hr />
        <h4>Heater:</h4>
        {
          Object.keys(heater).map((k) =>
            (<p key={k}>{k}: {heater[k] && (heater[k] || heater[k] === 'on') ? 'yes' : 'nope'}</p>))
        }

        <hr />
        <h4>Humidifier:</h4>
        {
          Object.keys(humidifier).map((k) =>
            (<p key={k}>{k}: {humidifier[k] || humidifier[k] === 'on' ? 'yes' : 'nope'}</p>))
        }
      </div>
    );
  }
}

export default injectIntl(TempHumidity);
