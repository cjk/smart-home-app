/* @flow */
/* eslint no-console: "off" */

import { ReplaySubject } from 'rxjs';

import deepstream from 'deepstream.io-client-js';

const config = {
  host: 'localhost' /* NOTE: Must use IP-address i.e. 192.168.1.28, zircon.local is not available on HOME-LAN! :( */,
  //   host: '192.168.1.28' /* NOTE: Must use IP-address i.e. 192.168.1.28, zircon.local is not available on HOME-LAN! :( */,
  port: 6020,
  namespace: 'smartHomeFrontend',
};

/* PENDING: the only place we still need bluebird. Once we have a replacement this Dependency can be removed finally */
const loginPromise = () =>
  /* NOTE: if you ever want to replace this with Observable.fromPromis() see also here:
     https://github.com/redux-observable/redux-observable/issues/33 */
  new Promise((resolve, reject) => {
    const client = deepstream(`${config.host}:${config.port}`).login(
      { username: config.namespace },
      success => {
        if (success) {
          resolve(client);
        } else {
          /* login or connection failed - see https:deepstream.io/docs/client-js/client/ how to handle this situation more
             gracefully than now. */
          reject();
        }
      }
    );
  });

const ds = {
  Client() {
    return Object.create(this.connection).init();
  },

  connection: {
    connOpen() {
      return this.connChanged;
    },
    client: null, // deepstream(`${config.host}:${config.port}`),
    connChanged: new ReplaySubject(),
    init() {
      console.info('[homeConnect] Initializing connection to deepstream.io...');
      loginPromise().then(
        client => {
          this.client = client;
          this.connChanged.next(client);
        },
        err => {
          console.error('Failed to connect to deepstream-server:');
          console.error(err);
        }
      );
      return this;
    },
  },
};

const dsClient = ds.Client();

function connectClient() {
  return dsClient;
}

export default connectClient;
