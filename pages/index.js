import React from 'react';

import { bindActionCreators } from 'redux';
import createStore from '../lib/create-store';
import withRedux from 'next-redux-wrapper';
import { doAction } from '../lib/app/actions';
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
  static getInitialProps({ store, isServer }) {
    store.dispatch(doAction(isServer));

    return { isServer }; // we can pass custom props to our component from here
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

const mapDispatchToProps = dispatch => ({
  doAction: bindActionCreators(doAction, dispatch),
});

export default withRedux(createStore, null, mapDispatchToProps)(Index);
