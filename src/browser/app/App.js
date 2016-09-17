/* @flow */
import './App.scss';
import * as themes from './themes';
import Appbar from './Appbar';
import AppMenu from './Menu';
import Footer from './Footer';
import Helmet from 'react-helmet';
import React from 'react';
import favicon from '../../common/app/favicon';
import start from '../../common/app/start';
// import { Container } from '../app/components';
import { ThemeProvider } from '../../common/app/components';
import { connect } from 'react-redux';

/* Material-Design-Lite imports */
import Layout from 'react-mdl/lib/Layout/Layout';
import { Content, Header } from 'react-mdl/lib/Layout';

// v4-alpha.getbootstrap.com/getting-started/introduction/#starter-template
const bootstrap4Metas: any = [
  { charset: 'utf-8' },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
  },
  {
    'http-equiv': 'x-ua-compatible',
    content: 'ie=edge',
  },
];

let App = ({ children, currentLocale, currentTheme }) => (
  <ThemeProvider
    key={currentTheme} // The same issue github.com/yahoo/react-intl/issues/234
    theme={themes[currentTheme] || themes.initial}
  >
    <div className="container">
      <Helmet
        htmlAttributes={{ lang: currentLocale }}
        meta={[
          ...bootstrap4Metas,
          {
            name: 'description',
            content: 'smart home control app',
          },
          ...favicon.meta,
        ]}
        link={[
          ...favicon.link,
        ]}
      />

      <Layout fixedHeader>
        {/* Pathname enforces rerender so activeClassName is updated. */}
        <Header>
          <Appbar />
        </Header>

        <AppMenu />

        <Content className="page-content">
          {children}
        </Content>

        <Footer />
      </Layout>
    </div>
  </ThemeProvider>
);

App.propTypes = {
  children: React.PropTypes.node.isRequired,
  currentLocale: React.PropTypes.string.isRequired,
  currentTheme: React.PropTypes.string,
};

App = connect(state => ({
  currentLocale: state.intl.currentLocale,
  currentTheme: state.themes.currentTheme,
}))(App);

export default start(App);
