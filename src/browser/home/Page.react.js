import './Home.scss';
import AddressList from './AddressList.react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { requestInitialState } from '../../common/home/actions';
import { connect } from 'react-redux';
import { Card } from 'react-mdl/lib';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import smartHomeConnect from '../../common/home/connector';
import { processEvent } from '../../common/home/actions';

const messages = defineMessages({
  title: {
    defaultMessage: 'Home',
    id: 'home.title'
  }
});

class Page extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    smartHome: PropTypes.object.isRequired,
    intl: intlShape.isRequired
  };

  componentDidMount() {
    /* Request and wait for loading of smart-home-state from backend */
    const { dispatch } = this.props;
    dispatch(requestInitialState());

    const { subscribeToBusEvents } = smartHomeConnect();
    const boundProcessEvent = (state) => dispatch(processEvent(state));
    subscribeToBusEvents(boundProcessEvent);
  }

  render() {
    const { intl, smartHome: { livestate: addressMap } } = this.props;
    const title = intl.formatMessage(messages.title);
    const addresses = addressMap.toList();

    return (
      <Card className="home-page" id="home">
        <Helmet title={ title } />
        <AddressList {...{ addresses }} />
      </Card>
    );
  }
}

Page = injectIntl(Page);

export default connect(state => ({
  smartHome: state.smartHome
}))(Page);
