// Something like Angular services, but code is explicit.
// Function returned from action gets dependencies, getState, and dispatch.
// Actions is where we should place statefull workflows.
export default function injectDependencies(statics, dynamic = {}) {
  console.log('InjectStaticDeps:', statics);
  console.log('InjectDynDeps:', dynamic);
  // TODO: Add invariants and publish it as npm module.
  return ({dispatch, getState}) => next => action => {
    if (typeof action !== 'function') return next(action);
    const dependencies = {...statics};
    Object.keys(dynamic).forEach(key => {
      dependencies[key] = dynamic[key](getState());
    });
    console.log('###### all-deps:', dependencies);
    return dispatch(action({...dependencies, getState, dispatch}));
  };
}
