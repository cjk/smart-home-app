import './event.less';
import Component from '../components/component.react';
import moment from 'moment';
import React from 'react';

export default class Event extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    event: React.PropTypes.object.isRequired
  }

  render() {
    const {actions, event} = this.props;

    return (
      <li className="event">
        <span className="event-created">{moment(event.created).format('MMMM Do YYYY, h:mm:ss a')}</span>
        <span className="event-action">{event.action}</span>
        <span className="event-action">{event.dest}</span>
        <span className="event-action">{event.src}</span>
        <span className="event-action">{event.type}</span>
        <span className="event-action">{event.value}</span>
      </li>
    );
  }

}
