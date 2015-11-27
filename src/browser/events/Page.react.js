import Component from 'react-pure-render/component';
import Events from './Events.react';
import Helmet from 'react-helmet';

import React, {PropTypes} from 'react';

export default class Page extends Component {

  static propTypes = {
    actions: PropTypes.object,
    events: PropTypes.object,
    msg: PropTypes.object
  }

  render() {
    const {actions, msg: {todos: msg}, events: {list}} = this.props;

    return (
      <div className="todos-page">
        <Helmet title={msg.title} />
        <Events {...{list, actions, msg}} />
      </div>
    );
  }

}
