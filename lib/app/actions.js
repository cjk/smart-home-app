export const actionTypes = {
  DO: 'DO',
};

// ACTIONS

// export const serverRenderClock = isServer => dispatch => {
//   return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() });
// };

export const doAction = () => dispatch => {
  console.log('dispatching action doAction');
  return setInterval(
    () => dispatch({ type: 'DO', ts: Date.now() }),
    800
  );
};
