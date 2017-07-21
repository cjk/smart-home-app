// @flow
import React from 'react';
import { connect } from 'react-redux';
import { toggleShowOnlyActive } from '../lib/app/actions';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import FolderIcon from 'material-ui-icons/Folder';
import { LabelSwitch } from 'material-ui/Switch';

type Props = {
  showActive: boolean,
  onToggleClick: Function,
};

const showOnlyActiveToggle = (props: Props) => {
  const { showActive, onToggleClick } = props;
  return (
    <div>
      <LabelSwitch
        style={{ color: 'inherit' }}
        checked={showActive}
        onChange={(event, checked) => onToggleClick(!checked)}
        label="only active"
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
