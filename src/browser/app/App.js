/* @flow */
import './App.css';
import type { State } from '../../common/types';
import Header from './Header';
import Footer from './Footer';
import Helmet from 'react-helmet';
import React from 'react';
import common from '../../common/app/common';
import favicon from '../../common/app/favicon';
import { compose } from 'ramda';
import { Box, Container, Flex } from '../components';
import { connect } from 'react-redux';

type AppProps = {
  children: any,
  currentLocale: string,
};

const styles = {
  container: {
    minHeight: '100vh',
  },
  page: {
    flex: 1,
  },
};

const App = (
  {
    children,
    currentLocale,
  }: AppProps
) => (
  <Container>
    <Helmet
      htmlAttributes={{ lang: currentLocale }}
      meta={[
        // v4-alpha.getbootstrap.com/getting-started/introduction/#starter-template
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        },
        { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
        ...favicon.meta,
      ]}
      link={[...favicon.link]}
    />
    <Flex flexColumn style={styles.container}>
      <Header />
      <Box style={styles.page}>
        {children}
      </Box>
      <Footer />
    </Flex>
  </Container>
);

export default compose(
  common(),
  connect((state: State) => ({
    currentLocale: state.intl.currentLocale,
  }))
)(App);
