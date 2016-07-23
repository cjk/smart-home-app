import './HomePage.scss';
import AddressListByState from './AddressList.react';
import AddressListByRoom from './AddressListByRoom.react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import * as actions from '../../common/home/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-mdl/lib';
import Grid, { Cell } from 'react-mdl/lib/Grid';
import { FormattedMessage } from 'react-intl';
import linksMessages from '../../common/app/linksMessages';
import smartHomeConnect from '../../common/home/connector';

const homeActions = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

class HomePage extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    smartHome: PropTypes.object.isRequired,
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

  /* Define actions for current and sub-components */
  tabChange(tabId) {
    const { switchToTab } = this.props.actions;
    switchToTab(tabId);
  }

  updateAddr = (addr) => {
    const toggleAddrVal = (addr) => addr.set('value', !addr.value | 0);
    const { writeGroupAddr } = this.props.actions;

    return writeGroupAddr(toggleAddrVal(addr));
  }

  updateList = () => {
    const { requestInitialState } = this.props.actions;
    return requestInitialState();
  }

  render() {
    const { smartHome: { livestate: addressMap, activeTab, prefs } } = this.props;
    const actions = { updateAddr: this.updateAddr, updateList: this.updateList };
    const addresses = addressMap.toList();
    const onTabChange = this.tabChange.bind(this);

    const addrList = activeTab === 0
                   ? <AddressListByState {...{ addresses, actions }} />
                   : <AddressListByRoom {...{ addresses, actions, prefs }} />;

    return (
      <div className="home-page" id="home">

        {/* Note child is a function, so we can localize anything. */}
        <FormattedMessage {...linksMessages.home}>
          {message => <Helmet title={message} />}
        </FormattedMessage>

        <Grid>
          <Cell col={1} /> {/* left border column */}
          <Cell col={10}>  {/* main (center column) */}
            <section className="page-content">
              <div className="homeTabs">
                <Tabs activeTab={activeTab} onChange={onTabChange} >
                  <Tab>Devices</Tab>
                  <Tab>Rooms</Tab>
                </Tabs>
                <section className="content">
                  {addrList}
                </section>
              </div>
            </section>
          </Cell>
          <Cell col={1} /> {/* right border-column */}
        </Grid>
      </div>
    );
  }
}

export default connect(state => ({
  smartHome: state.smartHome,
}), homeActions)(HomePage);
