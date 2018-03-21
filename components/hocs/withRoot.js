// @flow

// Right now this code is mostly about making Material-UI work with nextjs - see
// https://github.com/mui-org/material-ui/blob/v1-beta/examples/nextjs/src/withRoot.js

import type { NextContext } from '../../types';
import * as React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import getPageContext from '../../lib/shared/getPageContext';

type Props = {
  pageContext: {
    theme: Object,
    sheetsManager: Map<any>,
    sheetsRegistry: Object,
    generateClassName: Function,
  },
};

function withRoot(Component: React.ComponentType<Props>) {
  class WithRoot extends React.Component<Props> {
    constructor(props: Props, context: any) {
      super(props, context);

      this.pageContext = this.props.pageContext || getPageContext();
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    pageContext = null;

    render() {
      // MuiThemeProvider makes the theme available down the React tree thanks to React context.
      return (
        <MuiThemeProvider
          theme={this.pageContext.theme}
          sheetsManager={this.pageContext.sheetsManager}
        >
          {/* CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...this.props} />
        </MuiThemeProvider>
      );
    }
  }

  WithRoot.getInitialProps = (ctx: NextContext) => {
    if (Component.getInitialProps) {
      return Component.getInitialProps(ctx);
    }

    return {};
  };

  return WithRoot;
}

export default withRoot;
