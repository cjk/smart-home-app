import './app.less';
import Component from '../components/component.react';
import Footer from './footer.react';
import React from 'react';
import createActions from './createactions';
import flux from '../lib/flux';
import smartHomeConnect from '../components/smart-home-connector.react';
import store from './store';
import {RouteHandler} from 'react-router';

import Layout, {Header, Drawer, Content, Navigation} from 'react-mdl/lib/layout/Layout';
import Appbar from '../components/appbar.react';

@flux(store)
@createActions
export default class App extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired
  }

  componentDidMount() {
    // Start listening to events from our automation-backend. Pass along actions
    // that should fire when an event is received from the backend.
    const {events: {newEventReceived}, addresses: {updateValue}} = this.props.actions;
    smartHomeConnect([newEventReceived, updateValue]);
  }

  render() {
    const {users: {viewer}, msg: {app: msg}} = this.props;

    return (
      <Layout fixedHeader={true}>
        <Header title={msg.title}>
          <Appbar actions={this.props.actions.auth} msg={msg} viewer={viewer} />
        </Header>

        <Drawer title="Drawer-Title">
          <Navigation>
            <a href="">Link #1</a>
            <a href="">Link #2</a>
            <a href="">Link #3</a>
            <a href="">Link #4</a>
          </Navigation>
        </Drawer>

        <Content>
          <RouteHandler {...this.props} />
        </Content>
        <Footer msg={msg.footer} />
      </Layout>
    );
  }
}
