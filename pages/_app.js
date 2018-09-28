// @flow

// Right now this code is mostly about making Material-UI work with nextjs - see
// https://github.com/mui-org/material-ui/blob/v1-beta/examples/nextjs/src/withRoot.js

import React from 'react'
import App, { Container } from 'next/app'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import getPageContext from '../lib/shared/getPageContext'

import { Provider } from 'react-redux'
import createStore from '../lib/create-store'
import withRedux from 'next-redux-wrapper'

import { compose } from 'ramda'
import withBusSubscribe from '../components/hocs/withBusSubscribe'

type Props = {
  pageContext: {
    theme: Object,
    sheetsManager: Map<any>,
    sheetsRegistry: Object,
    generateClassName: Function,
  },
}

class MyApp extends App {
  constructor(props: Props) {
    super(props)
    this.pageContext = getPageContext()
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          {/* Wrap every page in Jss and Theme providers */}
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
            <MuiThemeProvider theme={this.pageContext.theme} sheetsManager={this.pageContext.sheetsManager}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
              <Component pageContext={this.pageContext} {...pageProps} />
            </MuiThemeProvider>
          </JssProvider>
        </Provider>
      </Container>
    )
  }
}

export default compose(
  withRedux(createStore),
  withBusSubscribe
)(MyApp)
