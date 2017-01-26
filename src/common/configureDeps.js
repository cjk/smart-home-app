/* @flow weak */
// Damn, by feature importing doesn't work in Node.js.
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';
// So we have to import everything.
import firebase from 'firebase';
import validate from './validate';
import homeConnect from './app/homeConnect';

// Ensure only one Firebase instance. I don't know how costly new instance is
// and how to dispose of it. Yes, firebase.initializeApp is weird API.
let firebaseDeps = null;

const createFirebaseDeps = (firebaseConfig) => {
  if (!firebaseDeps) {
    firebase.initializeApp(firebaseConfig);
    firebaseDeps = {
      firebase: firebase.database().ref(),
      firebaseAuth: firebase.auth,
      firebaseDatabase: firebase.database,
    };
  }
  // // Check whether Firebase works.
  // firebaseDeps.firebase.child('hello-world').set({
  //   createdAt: firebaseDeps.firebaseDatabase.ServerValue.TIMESTAMP,
  //   text: 'Yes!'
  // });
  return firebaseDeps;
};

const configureDeps = (initialState, platformDeps) => ({
  ...platformDeps,
  /* CjK 24.01.2017 - Firebase-connection deactivated */
  //   ...createFirebaseDeps(initialState.config.firebase),
  getUid: () => platformDeps.uuid.v4(),
  now: () => Date.now(),
  validate,
  homeConnect,
});

export default configureDeps;
