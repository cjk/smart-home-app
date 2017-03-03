/* @flow */
import type { BusEvent } from '../../common/types';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { compose, isEmpty, lensProp, map, pluck, props, sort, take, set, view } from 'ramda';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import eventMessages from './messages';

import { Table, View } from '../components';

/* How many events to show in events-history table */
const maxListEntries = 50;

type Props = {
  eventHistory: Array<BusEvent>,
};

const EventList = ({ eventHistory }: Props) => {
  const sortEventHistory = sort((a, b) => a.created < b.created);

  const headings = pluck('name', [
    { name: 'created', label: 'Time' },
    { name: 'action', label: 'Action' },
    { name: 'dest', label: 'Address' },
    // { name: 'src', label: 'From' },
    // { name: 'type', label: 'Type' },
    { name: 'value', label: 'Value' },
  ]);

  const createdLens = lensProp('created');
  const dateIntoWords = e => set(
    createdLens,
    `${distanceInWordsToNow(view(createdLens, e), { includeSeconds: true })} ago`)(e);

  const rows = compose(
    map(props(headings)),
    map(dateIntoWords),
    take(maxListEntries),
    sortEventHistory)(eventHistory);

  if (isEmpty(rows)) return (
    <h4><FormattedMessage {...eventMessages.emptyList} /></h4>
  );

  return (
    <View>
      <Table data={rows} headings={headings} />
    </View>
  );
};

EventList.propTypes = {
  eventHistory: React.PropTypes.array.isRequired,
};

export default EventList;
