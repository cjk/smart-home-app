import { DataTable, TableHeader } from 'react-mdl/lib';
import { List, OrderedMap } from 'immutable';
import moment from 'moment';
import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
  emptyList: {
    defaultMessage: 'no events yet',
    id: 'event.emptyList',
  },
});

/* How many events to show in events-history table */
const maxListEntries = 50;

const EventList = ({ eventlist }) => {
  const sortedEventlist = eventlist.sortBy(e => e.created, (a, b) => a < b);

  const columns = List([
    { name: 'created', label: 'Time' },
    { name: 'action', label: 'Action' },
    { name: 'dest', label: 'Address' },
    // { name: 'src', label: 'From' },
    // { name: 'type', label: 'Type' },
    { name: 'value', label: 'Value' },
  ]);

  const rows = sortedEventlist.take(maxListEntries).map(event => (
    columns.reduce((row, col) => {
      const colName = col.name;
      const content = (colName === 'created' ?
                       moment(event[colName]).fromNow(true) :
                       event[colName]);

      return row.merge({ [colName]: content });
    }, OrderedMap())
  ));

  if (!eventlist.size) return (
    <h4><FormattedMessage {...messages.emptyList} /></h4>
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
};

EventList.propTypes = {
  eventlist: React.PropTypes.object.isRequired,
};

export default EventList;
