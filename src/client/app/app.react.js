import './app.less';
import Component from '../components/component.react';
import Footer from './footer.react';
import Header from './header.react';
import React from 'react';
import fetch from 'isomorphic-fetch';
import flux from '../lib/flux';
import store from './store';
import {RouteHandler} from 'react-router';
import {createValidate} from '../validate';

// import mui from '../components/mui.react';
import {AppCanvas} from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

import * as authActions from '../auth/actions';
import * as todosActions from '../todos/actions';

const actions = [authActions, todosActions];

@flux(store)
// @mui
export default class App extends Component {

  static propTypes = {
    flux: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    this.createActions();

    /* Needed for onTouchTap. Can go away when react 1.0 release. Check this
       repo: https://github.com/zilverline/react-tap-event-plugin */
    injectTapEventPlugin();
  }

  createActions() {
    const {flux, msg} = this.props;
    const state = () => flux.state.toObject();
    const validate = createValidate(() => msg);

    this.actions = actions.reduce((actions, {create, feature, inject}) => {
      const dispatch = (action, payload) =>
        flux.dispatch(action, payload, {feature});

      const deps = [dispatch, validate, fetch, state];
      const args = inject ? inject(...deps) : deps;
      return {...actions, [feature]: create(...args)};

    }, {});
  }

  render() {
    const props = {...this.props, actions: this.actions};
    const {users: {viewer}, msg} = props;

    return (
      <AppCanvas>
        {/* Pass only what is needed. The Law of Demeter ftw. */}
        <Header actions={actions} msg={msg} viewer={viewer} />
        <RouteHandler {...props} />
        <Footer msg={msg} />
      </AppCanvas>
    );
  }

}
