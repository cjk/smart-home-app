/* @flow */
import type { State } from '../../common/types';
import R from 'ramda';
import React from 'react';
import AddrListByRoom from './AddressListByRoom';
import AddrList from './AddressList';
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
    const toggleAddrVal = addr => R.assoc('value', !addr.value | 0, addr);
    const { writeGroupAddr } = this.props.actions;

    return writeGroupAddr(toggleAddrVal(addr));
  }

  updateList = () => {
    const { requestInitialState } = this.props.actions;
    return requestInitialState();
  }

  render() {
    const { smartHome: { livestate, activeTab, prefs } } = this.props;
    const actions = { updateAddr: this.updateAddr, updateList: this.updateList };
    /* TODO: */
    /* Built address-list, remove some address-types which should not be displayed */
    //     const { switchToTab } = this.props.actions;

    // const addrList = activeTab === 0
    //                ? <AddressListByState {...{ addresses, actions }} />
    //                : <AddressListByRoom {...{ addresses, actions, prefs }} />;

    const addresses = R.reject(addr => addr.type === 'fb', livestate);

    if (R.isEmpty(addresses)) {
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
        <AddrList {...{ addresses, actions }} />
        <AddrListByRoom {...{ addresses, actions, prefs }} />
      </View>
    );
  }
}

export default connect(
  (state: State) => ({
    smartHome: state.smartHome,
  }), homeActions,
)(HomePage);
