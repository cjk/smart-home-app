/* @flow */
import type { State } from '../../common/types';
import React from 'react';
import { connect } from 'react-redux';
import linksMessages from '../../common/app/linksMessages';
import { pathOr, reject, test } from 'ramda';

import { toggleShowOnlyActive } from '../../common/home/actions';
import AddrListByRoom from './AddressListByRoom';
import AddrList from './AddressList';
import { GoRadioTower } from 'react-icons/lib/go';
import { ButtonCircle, Title, View } from '../components';
import { Box } from 'reflexbox';

import { Motion, spring } from 'react-motion';

type HomePageProps = {
  smartHomeState: Object,
  location: Object,
  toggleShowOnlyActive: typeof toggleShowOnlyActive,
};

const HomePage = (
  { smartHomeState, location, toggleShowOnlyActive }: HomePageProps
) => {
  const { livestate, prefs } = smartHomeState;
  const onlyActive = prefs.showOnlyActive;
  const buttonMotionStyle = {
    s: spring(onlyActive ? 1.2 : 1),
    r: spring(onlyActive ? 360 : 0),
  };

  /* Built address-list, remove some address-types which should not be displayed */
  const addresses = reject(addr => addr.type === 'fb', livestate);

  const toggleOnlyActive = () => {
    toggleShowOnlyActive(onlyActive);
  };

  const toggleActiveButton = () => (
    <ButtonCircle
      theme={onlyActive ? 'primary' : 'secondary'}
      style={{ marginBottom: '15px' }}
      title="only active"
      onClick={() => toggleOnlyActive()}
    >
      <Motion style={buttonMotionStyle}>
        {({ s, r }) => (
          <GoRadioTower style={{ transform: `scale(${s}) rotate(${r}deg)` }} />
        )}
      </Motion>
    </ButtonCircle>
  );

  const viewType = pathOr('changes', ['pathname'], location);
  const addrList = test(/rooms$/, viewType)
    ? <AddrListByRoom addresses={addresses} prefs={prefs} />
    : <AddrList addresses={addresses} />;

  return (
    <View>
      <Title message={linksMessages.home} />
      <Box py={2}>
        {toggleActiveButton()}
        {addrList}
      </Box>
    </View>
  );
};

export default connect(
  (state: State) => ({
    smartHomeState: state.smartHome,
  }),
  { toggleShowOnlyActive }
)(HomePage);
