import './Home.less';
import AddressList from './AddressList.react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import fetch from '../components/fetch';
import {requestInitialState} from '../../common/home/actions';

class Page extends Component {

  static propTypes = {
    // Why not PropTypes.object.isRequired? Because:
    // https://github.com/rackt/react-router/issues/1505
    actions: PropTypes.object,
    msg: PropTypes.object,
    smartHome: PropTypes.object
  }

  // Fetch initial state only server-side
  static fetchActions = [requestInitialState];

  render() {
    console.log('Live-state: ', this.props.smartHome.livestate.toJS());

    const {msg: {home: msg}, smartHome: {livestate: addressList}, actions} = this.props;

    return (
      <div className="home-page" id="home">
        <Helmet title={msg.title} />
        <AddressList {...{actions, msg, addressList}} />
      </div>
    );
  }

}

export default fetch(requestInitialState)(Page);
