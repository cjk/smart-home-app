import './Home.less';
import AddressList from './AddressList.react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import fetch from '../../common/components/fetch';
import { requestInitialState } from '../../common/home/actions';
import { connect } from 'react-redux';
import { Card } from 'react-mdl/lib';

class Page extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired,
    smartHome: PropTypes.object.isRequired
  };

  render() {
    /*     console.log('Live-state: ', JSON.stringify(this.props.smartHome.livestate)); */
    const { msg: { title }, smartHome: { livestate: addressMap } } = this.props;
    const addresses = addressMap.toList();

    return (
      <Card className="home-page" id="home">
        <Helmet title={title} />
        <AddressList {...{ addresses }} />
      </Card>
    );
  }
}

// Truly universal (not only isomorphic) data fetching.
// One higher order component for browser, server, and mobile.
Page = fetch(requestInitialState)(Page);

export default connect(state => ({
  msg: state.intl.msg.home,
  smartHome: state.smartHome
}))(Page);
