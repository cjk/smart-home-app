export const actionTypes = {
  DO: 'DO',
};

// ACTIONS
export const doAction = () => dispatch => {
  return setTimeout(() => dispatch({ type: 'DO', status: 'working' }), 1000);
};
