/* @flow */
import type { Deps, State } from './types';
import validate from './validate';
import homeConnect from './app/homeConnect';

const configureDeps = (initialState: State, platformDeps: Deps) => ({
  ...platformDeps,
  getUid: () => platformDeps.uuid.v4(),
  now: () => Date.now(),
  validate,
  homeConnect,
});

export default configureDeps;
