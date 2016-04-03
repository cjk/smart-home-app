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
    fermenterState: React.PropTypes.object.isRequired,
    intl: intlShape.isRequired,
  };

  render() {
    const { fermenterState: state } = this.props;
    const { env, devices: { heater, humidifier } } = state;

    if (!env.createdAt) {
      return (<div>No information yet...</div>);
    }

    return (
      <div>
        <h4>Environment (iteration #{state.env.iterations}):</h4>
        <p><FormattedMessage {...messages.temperature} />: {state.env.temperature}</p>
        <p><FormattedMessage {...messages.humidity} />: {state.env.humidity}</p>
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
