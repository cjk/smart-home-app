// @flow

// Container-component for history visualizations

import type { State } from '../types';
import React from 'react';
import { connect } from 'react-redux';

// UI: Last changed address-log list
import AddressList from '../components/AddressList';

import { compose } from 'ramda';

const History = props => {
  const { addresses } = props;

  return <AddressList addresses={addresses} />;
};

export default compose(
  connect((state: State) => ({
    addresses: state.smartHome.livestate,
  }))
)(History);
