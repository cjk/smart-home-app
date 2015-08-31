import './app.less';
import Component from '../components/component.react';
import Footer from './footer.react';
import React from 'react';
import fetch from 'isomorphic-fetch';
import flux from '../lib/flux';
import store from './store';
import {RouteHandler} from 'react-router';
import {createValidate} from '../validate';

import Layout, {Header, Drawer, Content} from 'react-mdl/lib/layout/Layout';
import {FormattedHTMLMessage} from 'react-intl';
import Appbar from '../components/appbar.react';

import {Link} from 'react-router';

import * as authActions from '../auth/actions';
import * as todosActions from '../todos/actions';

import io from 'socket.io-client';

const actions = [authActions, todosActions];

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

    const socket = io.connect('http://localhost:4001');
    socket.emit('hello', {foo: 'whatever'});

    socket.on('KNX-event', (event) => {
      console.log('Received an event: ', event);
      // socket.emit('newMessage', {msg: 'The client is the new king!'});
    });

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
