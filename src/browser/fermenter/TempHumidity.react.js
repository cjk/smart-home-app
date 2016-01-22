import Component from 'react-pure-render/component';
import moment from 'moment';
import React from 'react';

export default class EventList extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    fermenterState: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired
  }

  render() {
    const {actions, fermenterState, msg} = this.props;

    return (
      <div>
        <p>Temperature: {fermenterState.currentState.temperature}</p>
        <p>Humidity: {fermenterState.currentState.humidity}</p>
        <p>Heater: {fermenterState.currentState.heaterIsRunning ? 'running' : 'stopped'}</p>
        <p>Humidifier: {fermenterState.currentState.humidifierIsRunning ? 'running' : 'stopped'}</p>
      </div>
    );
  }

}
