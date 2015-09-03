export const actions = create();
export const feature = 'addresses';

export function create(dispatch, validate) {

  return {

    updateValue(addr) {
      dispatch(actions.updateValue, addr);
    }

  };

}
