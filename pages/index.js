import React from 'react';

import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import App from '../components/App';
import Page from '../components/Page';

import connectClient from '../lib/client';
import { createInitialstateReq$ } from '../lib/shared/create-state-streams';
import { requestInitialStateSuccess } from '../lib/home/actions';

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
    console.log(
      `[getInitialProps] Dispatching connect client - on server?: ${isServer}`
    );

    if (isServer) {
      const state = await connectClient()
        .connOpen()
        .switchMap(client => createInitialstateReq$(client))
        .take(1)
        // DEBUGGING:
        // .do(state => {
        //   console.log(
        //     `[getInitialProps] initial-state: ${JSON.stringify(state)}`
        //   );
        // })
        .toPromise();

      // Send livestate to the redux-store as well, so it's available client-side
      await store.dispatch(requestInitialStateSuccess(state));
      return { livestate: state, isServer };
    }

    return { isServer };
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
