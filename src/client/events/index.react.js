import Buttons from './buttons.react';
import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import React from 'react';
import ToCheck from './tocheck.react';
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
        <div className="todos-page">
          <Events {...{list, actions, msg}} />
          <Buttons clearAllEnabled={list.size > 0} {...{actions, msg}} />
          <ToCheck msg={msg.toCheck} />
        </div>
      </DocumentTitle>
    );
  }

}
