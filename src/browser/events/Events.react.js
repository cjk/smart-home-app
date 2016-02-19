import Component from 'react-pure-render/component';
import {DataTable} from 'react-mdl/lib';
import {List, Map} from 'immutable';
import moment from 'moment';
import React from 'react';

export default class EventList extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    list: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired
  };

  render() {
    const {actions, list, msg} = this.props;

    const columns = List([
      {name: 'created', label: 'Time'},
      {name: 'action', label: 'Action'},
      {name: 'dest', label: 'Address'},
      {name: 'src', label: 'From'},
      {name: 'type', label: 'Type'},
      {name: 'value', label: 'Value'},
    ]);

    const data = list.map(event => {
      return columns.reduce((row, col) => {
        const colName = col.name;
        const content = (colName === 'created' ? moment(event[colName]).format('MMMM Do YYYY, HH:mm:ss') : event[colName]);

        return row.merge({[colName]: content});
      }, Map());
    });

    if (!list.size) return (
      <p>{msg.emptyList}</p>
    );

    return (
      <DataTable columns={columns.toJS()} data={data.toJS()} />
    );
  }

}
