import Component from '../components/component.react';
import React from 'react';
import Event from './event.react';

export default class List extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    list: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired
  }

  render() {
    const {actions, list, msg} = this.props;

    if (!list.size) return (
      <p>{msg.emptyList}</p>
    );

    return (
      <ol className="todos">
        {list.map(todo =>
          <Event {...{actions, todo}} key={todo.id} />
        )}
      </ol>
    );
  }

}
