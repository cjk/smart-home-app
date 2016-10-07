/* @flow */
import './App.scss';
import * as themes from './themes';
import AppMenu from './Menu';
import Header from './Header';
import Footer from './Footer';
import Helmet from 'react-helmet';
import React from 'react';
import favicon from '../../common/app/favicon';
import start from '../../common/app/start';

// import { Container } from '../app/components';
import { Match, ThemeProvider } from '../../common/app/components';
import { Miss } from 'react-router';
import { connect } from 'react-redux';

/* Material-Design-Lite imports */
import { Content } from 'react-mdl/lib/Layout';
import Layout from 'react-mdl/lib/Layout/Layout';

// Pages
import Home from '../home/HomePage';
// import Intl from '../intl/IntlPage';
// import Me from '../me/MePage';
import NotFound from '../notfound/NotFoundPage';
// import Offline from '../offline/OfflinePage';
// import Profile from '../me/ProfilePage';
// import Settings from '../me/SettingsPage';
// import SignIn from '../auth/SignInPage';
import Events from '../events/EventsPage';
import Fermenter from '../fermenter/FermenterPage';

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

let App = ({ currentLocale, currentTheme }) => (
  <ThemeProvider
    key={currentTheme} // github.com/yahoo/react-intl/issues/234#issuecomment-163366518
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

        <Header />
        <AppMenu />

        <Content className="page-content">
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/events" component={Events} />
          <Match pattern="/fermenter" component={Fermenter} />
          <Miss component={NotFound} />
        </Content>

        <Footer />

      </Layout>
    </div>
  </ThemeProvider>
);

App.propTypes = {
  currentLocale: React.PropTypes.string.isRequired,
  currentTheme: React.PropTypes.string,
};

App = connect(state => ({
  currentLocale: state.intl.currentLocale,
  currentTheme: state.themes.currentTheme,
}))(App);

export default start(App);
