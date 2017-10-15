// @flow
import type { Action, Dispatch, Scenes as ScenesType } from '../types';

import * as React from 'react';
import { connect } from 'react-redux';
import { compose, isEmpty, map } from 'ramda';
import SceneCard from './SceneCard';

type Props = {
  scenes: ScenesType,
  dispatch: Dispatch,
};

class Scenes extends React.Component<Props> {
  componentDidMount() {
    const { dispatch, scenes } = this.props;
    // client-only actions to perform: fetching scenes from cloud if not already done so
    if (isEmpty(scenes)) dispatch(({ type: 'FETCH_SCENES' }: Action));
  }

  render() {
    const { scenes } = this.props;
    return (
      <div className="scenesLst">
        {map(scene => <SceneCard key={scene.id} scene={scene} />, scenes)}
      </div>
    );
  }
}

export default compose(
  connect(state => ({
    scenes: state.smartHome.scenes,
  }))
)(Scenes);
