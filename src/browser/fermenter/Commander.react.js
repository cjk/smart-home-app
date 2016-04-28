import Component from 'react-pure-render/component';
import R from 'ramda';
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

class FermenterCommander extends Component {

  static propTypes = {
    fermenterStatus: React.PropTypes.string.isRequired,
    intl: intlShape.isRequired,
  };

  render() {
    const { fermenterStatus: status } = this.props;
    console.log(`~~~ Fermenter-Status is ${status}`);

    if (R.empty(status)) {
      return (<div>No status yet...</div>);
    }

    return (
      <div>
        <h4>Status:</h4>
        <p>{status}</p>
      </div>
    );
  }
}

export default injectIntl(FermenterCommander);
