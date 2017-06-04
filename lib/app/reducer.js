export const actionTypes = {
  DO: 'DO',
};

const reducer = (state = { status: 'undefined' }, action) => {
  switch (action.type) {
    case actionTypes.DO:
      console.log(`reducing state: ${JSON.stringify(state)}`);
      return Object.assign({}, state, {
        status: action.status,
      });
    default:
      return state;
  }
};

export default reducer;
