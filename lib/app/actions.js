// @flow
import type { Action } from '../../types';

export const toggleShowOnlyActive = (value: boolean): Action => ({
  type: 'TOGGLE_SHOW_ONLY_ACTIVE',
  toggleValue: !value,
});

export const changeSelectedListTab = (value: number): Action => ({
  type: 'CHANGE_SELECTED_LIST_TAB',
  value,
});
