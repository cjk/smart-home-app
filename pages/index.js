import React from 'react';

import type { Action } from '../types';
import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import App from '../components/App';
import Page from '../components/Page';

import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import { bindActionCreators } from 'redux';
import { Observable } from 'rxjs/Observable';
import connectClient from '../lib/client';
import { requestInitialStateSuccess } from '../lib/home/actions';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

// TODO: Refactor (out)?
const reqInitState = client =>
  Observable.create(observer => {
    client.record.snapshot('knx/initialBusState', (error, record) => {
      if (error) {
        console.error('Error requesting initialBusState from deepstream');
        observer.error('Error requesting initialBusState from deepstream');
      }
      observer.next(record);
      observer.complete();
    });
    /* No cleanup necessary, we only requested a snapshot above */
    return () => {};
  });

class Index extends React.Component {
  static async getInitialProps({ store, isServer }) {
    console.log(`[getInitialProps] Dispatching connect client - on server?: ${isServer}`);

    if (isServer) {
      const state = await connectClient()
        .connOpen()
        .switchMap(client => reqInitState(client))
        .take(1)
      // DEBUGGING:
      // .do(state => {
      //   console.log(
      //     `[getInitialProps] initial-state: ${JSON.stringify(state)}`
      //   );
      // })
        .toPromise();

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

const mapDispatchToProps = dispatch => {
  return {
    reqInitialStateSuccess: bindActionCreators(
      requestInitialStateSuccess,
      dispatch
    ),
  };
};

export default withRedux(createStore)(Index);
