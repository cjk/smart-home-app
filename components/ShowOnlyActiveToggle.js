// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { toggleShowOnlyActive } from '../lib/app/actions';
import Switch from 'material-ui/Switch';

type Props = {
  showActive: boolean,
  onToggleClick: Function,
};

const showOnlyActiveToggle = (props: Props) => {
  const { showActive, onToggleClick } = props;
  return (
    <div>
      <Switch
        style={{ color: 'inherit' }}
        checked={showActive}
        onChange={(event, checked) => onToggleClick(!checked)}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  onToggleClick: (toggleChecked: boolean) => {
    dispatch(toggleShowOnlyActive(toggleChecked));
  },
});

export default connect(
  state => ({ showActive: state.app.prefs.showOnlyActive }),
  mapDispatchToProps
)(showOnlyActiveToggle);
