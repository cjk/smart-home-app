import Component from 'react-pure-render/component';
import Events from './Events.react';
import Helmet from 'react-helmet';

import React, {PropTypes} from 'react';

export default class Page extends Component {

  static propTypes = {
    actions: PropTypes.object,
    msg: PropTypes.object,
    smartHome: PropTypes.object,
  };

  render() {
    const {actions, msg: {todos: msg}, smartHome: {eventHistory: list}} = this.props;

    return (
      <div className="events-page" id="events">
        <Helmet title={msg.title} />
        <Events {...{list, actions, msg}} />
      </div>
    );
  }

}
