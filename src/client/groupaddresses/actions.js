export const actions = create();
export const feature = 'addresses';

export function create(dispatch, validate) {

  return {

    setInitialState(state) {
      dispatch(actions.setInitialState, state);
    },

    updateValue(addr) {
      dispatch(actions.updateValue, addr);
    }

  };

}
