import React from 'react';

const WithBusSubsribe = Page =>
  class WithBusSubsribe extends React.Component {
    static async getInitialProps(ctx) {
      let composedInitialProps = {};
      if (Page.getInitialProps) {
        composedInitialProps = await Page.getInitialProps(ctx);
      }
      return { ...composedInitialProps };
    }

    // your client-only actions go here:
    componentDidMount() {
      const { dispatch } = this.props;
      dispatch({ type: 'SUBSCRIBE_TO_BUS' });
    }

    render() {
      return <Page {...this.props} />;
    }
  };

export default WithBusSubsribe;
