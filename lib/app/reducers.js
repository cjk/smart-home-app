export const actionTypes = {
  DO: 'DO',
};

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.DO:
      console.log(`reducing state: ${JSON.stringify(state)}`);
      return Object.assign({}, state, {
        lastUpdate: action.ts,
      });
    default:
      return state;
  }
};
