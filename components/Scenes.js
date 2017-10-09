// @flow
import type { Action, Dispatch, Scenes as ScenesType } from '../types';

import * as React from 'react';
import { connect } from 'react-redux';
import { compose, isEmpty } from 'ramda';

type Props = {
  scenes: ScenesType,
  dispatch: Dispatch,
};

class Scenes extends React.Component<Props> {
  componentDidMount() {
    const { dispatch } = this.props;
    // client-only actions to perform: fetching scenes from cloud
    dispatch(({ type: 'FETCH_SCENES' }: Action));
  }

  render() {
    const { scenes } = this.props;
    // TODO: Use render-props / render-callbacks? See https://codedaily.io/tutorials/6/Using-Functions-as-Children-and-Render-Props-in-React-Components
    return <div>Scenes: { isEmpty(scenes) ? 'loading....' : `${scenes[0]}`}</div>;
  }
}

export default compose(
  connect(state => ({
    scenes: state.smartHome.scenes,
  }))
)(Scenes);
