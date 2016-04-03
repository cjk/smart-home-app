import './Home.scss';
import AddressList from './AddressList.react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
/* MERGE-TODO */
import { requestInitialState } from '../../common/home/actions';
import { connect } from 'react-redux';
import { Card } from 'react-mdl/lib';
import React, { PropTypes } from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

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
    const { dispatch } = this.props;
    dispatch(requestInitialState);
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

/* MERGE-TODO */
// Truly universal (not only isomorphic) data fetching.
// One higher order component for browser, server, and mobile.
/* Page = fetch(requestInitialState)(Page); */

Page = injectIntl(Page);


export default connect(state => ({
  smartHome: state.smartHome
}))(Page);
