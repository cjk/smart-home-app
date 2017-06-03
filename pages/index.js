import React from 'react';

import type { Action } from '../types';
import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import App from '../components/App';
import Page from '../components/Page';

import Button from 'material-ui/Button';

import Typography from 'material-ui/Typography';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

class Index extends React.Component {
  static async getInitialProps({ store, isServer }) {
    console.log(`Dispatching connect client - on server?: ${isServer}`);
    await store.dispatch(({ type: 'CONNECT_CLIENT' }: Action));
    return { isServer }; // we can pass custom props to our component from here
  }

  componentDidMount() {
    console.log('Index page mounted! Home-props:');
    console.log(this.props);
  }

  render() {
    return (
      <App>
        <div style={styles.container}>
          <Typography type="display1" gutterBottom>Material-UI</Typography>
          <Typography type="subheading" gutterBottom>
            example project
          </Typography>
          <Button raised accent>
            Super Secret Password
          </Button>
          <Page title="Index Page" linkTo="/other" />
        </div>
      </App>
    );
  }
}

export default withRedux(createStore)(Index);
