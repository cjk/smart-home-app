import React from 'react';

const WithBusSubsribe = Child =>
  class WithBusSubsribe extends React.Component {
    static getInitialProps(ctx) {
      console.log('#### Inside HOC!');
      return Child.getInitialProps(ctx);
    }

    componentDidMount() {
      console.log('[withBusSubscribe] - mounted!');
      console.log(this.props);
      const { dispatch } = this.props;
      dispatch({ type: 'SUBSCRIBE_TO_BUS' });
    }

    render() {
      return <Child {...this.props} />;
    }
  };

export default WithBusSubsribe;
