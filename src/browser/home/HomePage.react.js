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
import linksMessages from '../../common/app/linksMessages';
import { injectIntl, intlShape } from 'react-intl';
import smartHomeConnect from '../../common/home/connector';

const homeActions = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

class HomePage extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    smartHome: PropTypes.object.isRequired,
    intl: intlShape.isRequired
  };

  componentDidMount() {
    /* Request and wait for loading of smart-home-state from backend */
    const { actions: { requestInitialState, processEvent } } = this.props;
    requestInitialState();

    const { subscribeToBusEvents } = smartHomeConnect();
    subscribeToBusEvents(processEvent);
  }

  tabChange(tabId) {
    const { switchToTab } = this.props.actions;
    switchToTab(tabId);
  }

  render() {
    const { intl, smartHome: { livestate: addressMap, activeTab } } = this.props;
    const title = intl.formatMessage(linksMessages.home);
    const addresses = addressMap.toList();
    const onTabChange = this.tabChange.bind(this);

    const addrList = activeTab === 0
                   ? <AddressListByState {...{ addresses }} />
                   : <AddressListByRoom {...{ addresses }} />;

    return (
      <div className="home-page" id="home">
        <Helmet title={title} />
        <Grid>
          <Cell col={1} /> {/* left border column */}
          <Cell col={10}>  {/* main (center column) */}
            <section className="page-content">
              <div className="homeTabs">
                <Tabs activeTab={activeTab} onChange={onTabChange} ripple>
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

HomePage = injectIntl(HomePage);

export default connect(state => ({
  smartHome: state.smartHome
}), homeActions)(HomePage);
