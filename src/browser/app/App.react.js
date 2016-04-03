import './App.scss';
import Appbar from './Appbar.react';
import Component from 'react-pure-render/component';
import Footer from './Footer.react';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import start from '../../common/app/start';
import { connect } from 'react-redux';
/* Material-Design-Lite imports */
import Layout from 'react-mdl/lib/Layout/Layout';
import { Content, Header, Drawer, Navigation } from 'react-mdl/lib/Layout';

// v4-alpha.getbootstrap.com/getting-started/introduction/#starter-template
const bootstrap4Metas = [
  { charset: 'utf-8' },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
  },
  {
    'http-equiv': 'x-ua-compatible',
    content: 'ie=edge'
  }
];

class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    currentLocale: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired
  };

  render() {
    const { children, currentLocale, location } = this.props;

    return (
      <div className="page">
        <Helmet
          htmlAttributes={{ lang: currentLocale }}
          titleTemplate="%s - Este.js"
          meta={[
            ...bootstrap4Metas,
            {
              name: 'description',
              content: 'smart home control app'
            }
          ]}
          link={[
            { rel: 'shortcut icon', href: require('./favicon.ico') }
          ]}
        />

        <Layout fixedHeader>
          {/* Pathname enforces rerender so activeClassName is updated. */}
          <Header pathname={location.pathname}>
            <Appbar pathname={location.pathname} />
          </Header>

          {/* MERGE-TODO: Move to own component and use ./linksMessages for link-texts */}
          <Drawer title="Menu">
            <Navigation>
              <a href="">Link #1</a>
              <a href="">Link #2</a>
              <a href="">Link #3</a>
              <a href="">Link #4</a>
            </Navigation>
          </Drawer>

          <Content className="page-content">
            {children}
          </Content>

          <Footer />
        </Layout>
      </div>
    );
  }
}

App = start(App);

export default connect(state => ({
  currentLocale: state.intl.currentLocale
}))(App);
