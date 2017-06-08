// Root-HOC concerned with:
// 1. setting up everything around Material-UI and make it work with SSR
// 2. ...
import type { Children } from 'react';
import React, { Component } from 'react';
import {
  withStyles,
  createStyleSheet,
  MuiThemeProvider,
} from 'material-ui/styles';
import { getDefaultContext } from '../styles/createDefaultContext';

type AppProps = {
  children: Children,
};

const styleSheet = createStyleSheet('App', theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      fontFamily: theme.typography.fontFamily,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    },
    body: {
      margin: 0,
    },
    a: {
      color: 'inherit',
    },
  },
}));

let AppWrapper = props => props.children;

AppWrapper = withStyles(styleSheet)(AppWrapper);

class App extends Component<void, AppProps, void> {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { styleManager, theme } = getDefaultContext();
    return (
      <MuiThemeProvider styleManager={styleManager} theme={theme}>
        <AppWrapper>
          {this.props.children}
        </AppWrapper>
      </MuiThemeProvider>
    );
  }
}

export default App;
