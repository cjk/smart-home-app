import './HomePage.scss';
import AddressList from './AddressList.react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { requestInitialState, processEvent } from '../../common/home/actions';
import { connect } from 'react-redux';
import { Card } from 'react-mdl/lib';
import linksMessages from '../../common/app/linksMessages';
import { FormattedHTMLMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import smartHomeConnect from '../../common/home/connector';

const messages = defineMessages({
  intro: {
    defaultMessage: `
      <p>
        Welcome, this is CjK's
        <a target="_blank" href="https://github.com/cjk/smart-home-app">smart-home</a> app.
      </p>
    `,
    id: 'home.intro'
  }
});

class HomePage extends Component {

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
    const title = intl.formatMessage(linksMessages.home);
    const addresses = addressMap.toList();

    return (
      <Card className="home-page" id="home">
        <Helmet title={ title } />
        <FormattedHTMLMessage {...messages.intro} />
        <AddressList {...{ addresses }} />
      </Card>
    );
  }
}

HomePage = injectIntl(HomePage);

export default connect(state => ({
  smartHome: state.smartHome
}))(HomePage);
