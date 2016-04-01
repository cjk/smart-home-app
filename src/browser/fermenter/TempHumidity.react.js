import Component from 'react-pure-render/component';
import React from 'react';
import { connect } from 'react-redux';

class TempHumidity extends Component {

  static propTypes = {
    fermenterState: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired
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
        <p>Temperature: {state.env.temperature}</p>
        <p>Humidity: {state.env.humidity}</p>

        <hr />
        <h4>Heater:</h4>
        {
          Object.keys(heater).map((k) =>
            (<p key={k}>{k}: {heater[k] && (heater[k] || heater[k] === 'on') ? 'yes' : 'nope'}</p>)
          )
        }

        <hr />
        <h4>Humidifier:</h4>
        {
          Object.keys(humidifier).map((k) =>
            (<p key={k}>{k}: {humidifier[k] || humidifier[k] === 'on' ? 'yes' : 'nope'}</p>)
          )
        }
      </div>
    );
  }

}

export default connect(state => ({
  msg: state.intl.msg.fermenter,
}))(TempHumidity);
