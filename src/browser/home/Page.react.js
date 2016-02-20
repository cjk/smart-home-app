import './Home.less';
import AddressList from './AddressList.react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import fetch from '../../common/components/fetch';
import {requestInitialState} from '../../common/home/actions';
import {connect} from 'react-redux';

class Page extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired,
    smartHome: PropTypes.object.isRequired
  };

  render() {
    console.log('Live-state: ', this.props.smartHome.livestate.toJS());

    const {msg: {title}, smartHome: {livestate: addressList}} = this.props;

    return (
      <div className="home-page" id="home">
        <Helmet title={title} />
        <AddressList {...{addressList}} />
      </div>
    );
  }
}

// Truly universal (not only isomorphic) data fetching.
// One higher order component for browser, server, and mobile.
/* MERGE-TODO */
Page = fetch(requestInitialState)(Page);

// export default fetch(requestInitialState)(Page);
export default connect(state => ({
  msg: state.intl.msg.home,
  smartHome: state.smartHome
}))(Page);
