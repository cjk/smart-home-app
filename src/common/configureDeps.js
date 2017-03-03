/* @flow weak */
import validate from './validate';
import homeConnect from './app/homeConnect';

const configureDeps = (initialState, platformDeps) => ({
  ...platformDeps,
  getUid: () => platformDeps.uuid.v4(),
  now: () => Date.now(),
  validate,
  homeConnect,
});

export default configureDeps;
