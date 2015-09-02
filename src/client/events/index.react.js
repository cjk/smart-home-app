import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import React from 'react';
import Events from './events.react';

export default class Index extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    events: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired
  }

  render() {
    const {
      events: {list},
      actions: {events: actions},
      msg: {events: msg}
    } = this.props;

    return (
      <DocumentTitle title={msg.title}>
        <div className="events-page">
          <Events {...{list, actions, msg}} />
        </div>
      </DocumentTitle>
    );
  }

}
