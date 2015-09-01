import './app.less';
import Component from '../components/component.react';
import Footer from './footer.react';
import React from 'react';
import fetch from 'isomorphic-fetch';
import flux from '../lib/flux';
import smartHomeConnect from '../components/smart-home-connector.react';
import store from './store';
import {RouteHandler} from 'react-router';
import {createValidate} from '../validate';

import Layout, {Header, Drawer, Content} from 'react-mdl/lib/layout/Layout';
import {FormattedHTMLMessage} from 'react-intl';
import Appbar from '../components/appbar.react';

import * as authActions from '../auth/actions';
import * as eventActions from '../events/actions';

const actions = [authActions, eventActions];

@flux(store)
export default class App extends Component {

  static propTypes = {
    flux: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    this.createActions();
  }

  componentDidMount() {
    // Start listening to events from our automation-backend
    smartHomeConnect(this.actions.events);
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
    const {users: {viewer}, msg: {app: msg}} = props;

    return (
      <div style={{height: '300px', position: 'relative'}}>
        <Layout fixedHeader={true}>
          <Header title={msg.title}>
            <Appbar actions={actions} msg={msg} viewer={viewer}/>
          </Header>

          <Drawer title="Drawer-Title">
            <a href="">Link #1</a>
            <a href="">Link #2</a>
            <a href="">Link #3</a>
            <a href="">Link #4</a>
          </Drawer>

          <Content>

            <h1>
              <FormattedHTMLMessage message='On to the home-page:' />
            </h1>

            <RouteHandler {...props} />
          </Content>
          <Footer msg={msg.footer} />
        </Layout>
      </div>

    );
  }
}
