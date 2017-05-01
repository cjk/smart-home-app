/* @flow */
import type { State } from '../../common/types';
import React from 'react';
import { connect } from 'react-redux';
import linksMessages from '../../common/app/linksMessages';
import { pathOr, reject, test } from 'ramda';
import { Flex, Box } from 'reflexbox';

import { toggleShowOnlyActive, createCronjob } from '../../common/home/actions';
import AddrListByRoom from './AddressListByRoom';
import AddrList from './AddressList';
import { Title, ToggleButton, View } from '../components';

type HomePageProps = {
  smartHomeState: Object,
  location: Object,
  toggleShowOnlyActive: typeof toggleShowOnlyActive,
  createCronjob: typeof createCronjob,
};

const HomePage = ({
  smartHomeState,
  location,
  toggleShowOnlyActive,
}: HomePageProps) => {
  const { livestate, prefs } = smartHomeState;
  const onlyActive = prefs.showOnlyActive;

  /* Built address-list, remove some address-types which should not be displayed */
  const addresses = reject(addr => addr.type === 'fb', livestate);

  const toggleOnlyActive = () => toggleShowOnlyActive(onlyActive);

  const viewType = pathOr('changes', ['pathname'], location);
  const addrList = test(/rooms$/, viewType)
    ? <AddrListByRoom addresses={addresses} prefs={prefs} />
    : <AddrList addresses={addresses} />;

  return (
    <View>
      <Title message={linksMessages.home} />
      <Flex wrap>
        <Box col={1} py={2}>
          <ToggleButton
            title="show only active"
            isActive={onlyActive}
            theme={onlyActive ? 'primary' : 'secondary'}
            style={{ marginBottom: '15px' }}
            onClick={() => toggleOnlyActive()}
          />
        </Box>
        <Box col={12} py={2}>
          {addrList}
        </Box>
      </Flex>
    </View>
  );
};

export default connect(
  (state: State) => ({
    smartHomeState: state.smartHome,
  }),
  { toggleShowOnlyActive, createCronjob }
)(HomePage);
