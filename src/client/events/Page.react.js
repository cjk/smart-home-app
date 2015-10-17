import Component from 'react-pure-render/component';
import DocumentTitle from 'react-document-title';
import Events from './Events.react';

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
      <DocumentTitle title={msg.title}>
        <div className="todos-page">
          <Events {...{list, actions, msg}} />
        </div>
      </DocumentTitle>
    );
  }

}
