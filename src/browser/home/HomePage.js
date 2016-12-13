/* @flow */
import type { State } from '../../common/types';
/* MERGE-TODO: */
// import AddressListByState from './AddressList';
// import AddressListByRoom from './AddressListByRoom';
import R from 'ramda';
import React from 'react';
import * as actions from '../../common/home/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import linksMessages from '../../common/app/linksMessages';
import smartHomeConnect from '../../common/home/connector';

import {
  Block,
  PageHeader,
  Title,
  View,
} from '../app/components';

const homeActions = dispatch => ({ actions: bindActionCreators(actions, dispatch) });

class HomePage extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    smartHome: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.updateAddr = this.updateAddr.bind(this);
    this.updateList = this.updateList.bind(this);
  }

  componentDidMount() {
    /* Request and wait for loading of smart-home-state from backend */
    const { actions: { requestInitialState, processEvent } } = this.props;
    requestInitialState();

    const { subscribeToBusEvents } = smartHomeConnect();
    subscribeToBusEvents(processEvent);
  }

  updateAddr = (addr) => {
    const toggleAddrVal = addr => addr.set('value', !addr.value | 0);
    const { writeGroupAddr } = this.props.actions;

    return writeGroupAddr(toggleAddrVal(addr));
  }

  updateList = () => {
    const { requestInitialState } = this.props.actions;
    return requestInitialState();
  }

  render() {
    console.log(`[HomePage] Props: ${JSON.stringify(this.props)}`);
    const { smartHome: { livestate, activeTab, prefs } } = this.props;
    const actions = { updateAddr: this.updateAddr, updateList: this.updateList };
    /* Built address-list, remove some address-types which should not be displayed */
    //     const addresses = addressMap.toList().filter(a => a.type !== 'fb');
    const addresses = [];
    const { switchToTab } = this.props.actions;

    // const addrList = activeTab === 0
    //                ? <AddressListByState {...{ addresses, actions }} />
    //                : <AddressListByRoom {...{ addresses, actions, prefs }} />;

    if (R.isEmpty(livestate)) {
      return (
        <Block>
          <p>Waiting for SmartHome-State...</p>
        </Block>
      );
    }

    return (
      <View>
        <Title message={linksMessages.home} />
        <PageHeader
          description="A smart remote control for your smart home."
          heading="SmartHome-App"
        />
      </View>
    );
  }
}

export default connect(
  (state: State) => ({
    smartHome: state.smartHome,
  }), homeActions,
)(HomePage);
