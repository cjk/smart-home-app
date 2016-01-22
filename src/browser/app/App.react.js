import './App.less';
import Appbar from './Appbar.react';
import Component from 'react-pure-render/component';
import Footer from './Footer.react';
import Helmet from 'react-helmet';
import mapDispatchToProps from '../../common/app/mapDispatchToProps';
import mapStateToProps from '../../common/app/mapStateToProps';
import React, {PropTypes} from 'react';
import RouterHandler from '../../common/components/RouterHandler.react';

import {connect} from 'react-redux';
import {setupEventlistener} from '../../common/home/connector';
import Layout, {Header, Drawer, Content, Navigation} from 'react-mdl/lib/layout/Layout';

class App extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  };

  componentDidMount() {
    // Listen to events happening on the smartHome-BUS and collect them
    setupEventlistener(this.props.actions.addToEventhistory);
  }

  render() {
    const {location: {pathname}, msg, users: {viewer}} = this.props;

    console.log('App-props: ', this.props);

    return (
      // Pass data-pathname to allow route specific styling.
      <div className="page" data-pathname={pathname}>
        <Helmet
          link={[
            {rel: 'shortcut icon', href: require('./favicon.ico')}
          ]}
          meta={[{
            name: 'description',
            content: 'smart home control app'
          }]}
          titleTemplate="%s - by CjK"
        />

        <Layout fixedHeader={true}>
          {/* Pathname enforces rerender so activeClassName is updated. */}
          <Header title={msg.title}>
            <Appbar msg={msg} pathname={pathname} viewer={viewer} />
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
            <RouterHandler {...this.props} />
          </Content>

          <Footer msg={msg.app.footer} />
        </Layout>
      </div>
    );
  }

}

// // logRenderTime is useful for app with huge UI to check render performance.
// import logRenderTime from '../lib/logRenderTime';
// App = logRenderTime(App)

export default connect(mapStateToProps, mapDispatchToProps)(App);
