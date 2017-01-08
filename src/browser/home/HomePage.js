/* @flow */
import type { State } from '../../common/types';
import R from 'ramda';
import React from 'react';
import AddrListByRoom from './AddressListByRoom';
import AddrList from './AddressList';
import { connect } from 'react-redux';
import linksMessages from '../../common/app/linksMessages';

import {
  Block,
  PageHeader,
  Title,
  View,
} from '../app/components';

import { Box } from 'reflexbox';

type HomePageProps = {
  smartHomeState: Object,
  location: Object,
};

const HomePage = ({ smartHomeState, location }: HomePageProps) => {
  const { livestate, prefs }  = smartHomeState;

  /* Built address-list, remove some address-types which should not be displayed */
  const addresses = R.reject(addr => addr.type === 'fb', livestate);

  if (R.isEmpty(addresses)) {
    return (
      <Block>
        <p>Waiting for SmartHome-State...</p>
      </Block>
    );
  }

  const listStyle = R.pathOr('byState', ['query', 'listStyle'], location);
  const addrList = listStyle === 'byState'
                 ? <AddrList addresses={addresses} />
                 : <AddrListByRoom addresses={addresses} prefs={prefs} />;

  return (
    <View>
      <Title message={linksMessages.home} />
      <Box py={2}>
        {addrList}
      </Box>
    </View>
  );
}

export default connect(
  (state: State) => ({
    smartHomeState: state.smartHome,
  }),
)(HomePage);
