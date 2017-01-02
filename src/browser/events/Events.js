/* @flow */
import type { BusEvent } from '../../common/types';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import R from 'ramda';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import eventMessages from './messages';

import { Table, View } from '../app/components';

/* How many events to show in events-history table */
const maxListEntries = 50;

type Props = {
  eventHistory: Array<BusEvent>,
};

const EventList = ({ eventHistory }: Props) => {
  const sortEventHistory = R.sort((a, b) => a.created < b.created);

  const headings = R.pluck('name', [
    { name: 'created', label: 'Time' },
    { name: 'action', label: 'Action' },
    { name: 'dest', label: 'Address' },
    // { name: 'src', label: 'From' },
    // { name: 'type', label: 'Type' },
    { name: 'value', label: 'Value' },
  ]);

  const createdLens = R.lensProp('created');
  const dateIntoWords = e => R.set(createdLens, `${distanceInWordsToNow(R.view(createdLens, e))} ago`)(e);

  const rows = R.compose(
    R.map(R.props(headings)),
    R.map(dateIntoWords),
    R.take(maxListEntries),
    sortEventHistory)(eventHistory);

  if (R.isEmpty(rows)) return (
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
