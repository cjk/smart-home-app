import './appbar.less';

import Component from '../components/component.react';
import React from 'react';

import {Link} from 'react-router';

import {HeaderRow} from 'react-mdl/lib/layout/Layout';

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
      <HeaderRow>
        <a href="">Link</a>
        <a href="">Link</a>
        <a href="">Link</a>
        <a href="">Link</a>
      </HeaderRow>
    );
  }
}
