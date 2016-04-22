import Component from 'react-pure-render/component';
import { DataTable, TableHeader } from 'react-mdl/lib';
import { List, Map } from 'immutable';
import moment from 'moment';
import React from 'react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages({
  emptyList: {
    defaultMessage: 'no events yet',
    id: 'event.emptyList'
  }
});

class EventList extends Component {

  static propTypes = {
    list: React.PropTypes.object.isRequired,
    intl: intlShape.isRequired,
  };

  render() {
    const { list } = this.props;

    const columns = List([
      { name: 'created', label: 'Time' },
      { name: 'action', label: 'Action' },
      { name: 'dest', label: 'Address' },
      //{ name: 'src', label: 'From' },
      { name: 'type', label: 'Type' },
      { name: 'value', label: 'Value' },
    ]);

    const rows = list.map(event => (
      columns.reduce((row, col) => {
        const colName = col.name;
        const content = (colName === 'created' ?
                         moment(event[colName]).fromNow(true) :
                         event[colName]);

        return row.merge({ [colName]: content });
      }, Map())
    ));

    if (!list.size) return (
      <p><FormattedMessage {...messages.emptyList} /></p>
    );

    return (
      <DataTable rows={rows.toJS()}>
        {
          columns.map((col) => (
            <TableHeader key={col.name} name={col.name}>{col.label}</TableHeader>
          ))
        }
      </DataTable>
    );
  }
}

export default injectIntl(EventList);
