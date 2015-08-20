import './appbar.less';

import Component from '../components/component.react';
import React from 'react';

import {Link} from 'react-router';

import {AppBar, FlatButton} from 'material-ui';

// import Cart from './cart.react';

export default class Appbar extends Component {

  static propTypes = {
    actions: React.PropTypes.array.isRequired,
    msg: React.PropTypes.object.isRequired
    // cart: React.PropTypes.instanceOf(immutable.Map),
    // viewer: React.PropTypes.object.isRequired
  }

  render() {
    // const {actions, msg: {components: {cart: msg}}, cart} = this.props,
    // {cart: cartActions, auth: authActions} = actions;
    return (
      <AppBar
          className='mui-dark-theme navbar-top'
          showMenuIconButton={false}
          title={<img alt='bellicon-logo' src={'/assets/img/logo.png'} />}
          zDepth={1}>

        <Link to='home'>
          <FlatButton className='appBar-link-button' label='Home' secondary={false} />
        </Link>

      </AppBar>
    );
  }
}
