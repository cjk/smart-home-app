import type { Action } from '../../types';

export const toggleShowOnlyActive = (value: boolean): Action => ({
  type: 'TOGGLE_SHOW_ONLY_ACTIVE',
  toggleValue: !value,
});
