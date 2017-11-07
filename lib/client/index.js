/* @flow */

import logger from 'debug';
import { Observable, Subject, Subscription } from 'rxjs';

import deepstream from 'deepstream.io-client-js';

const debug = logger('smtApp:dsClient');

// Once you need it, see https://deepstreamhub.com/docs/client-js/client/
type AuthData = {
  type: string,
  user: string,
  password: string,
};

type DsConfig = {
  host: ?string,
  port: number,
  namespace: string,
};

const config : DsConfig = {
  /* NOTE: Must use IP-address i.e. 192.168.1.28, zircon.local is not available on HOME-LAN! :( */
  host: process.env.BACKEND_ADDR,
  port: 6020,
  namespace: 'smartHomeFrontend',
};

class DsClient {
  constructor() {
    debug(`Connecting to deepstream-server on ${config.host}:${config.port}`);
    this.client = deepstream(`${config.host}:${config.port}`);
    this.states$ = new Subject();
    this.errors$ = new Subject();
  }

  client: Function; // Deepstream-client reference
  states$: Subject<any>;
  errors$: Subject<any>;

  subscribtion: Subscription;
  errorSubscribtion: Subscription;

  login(authData: ?AuthData): Observable<*> {
    const loginSubject = new Subject();

    this.client.login(authData, (success, data) => {
      if (success === true) {
        // Return the clientData
        loginSubject.next(data);
        loginSubject.complete();
      } else {
        // Close the connection if error happened
        this.close().subscribe(() => {
          loginSubject.error(new Error('Login Failed'));
        }, loginSubject.error);
      }
    });

    // Create the subscribtions
    this.errorSubscribtion = Observable.fromEvent(this.client, 'error')
      .do(state => {
        debug('Error happened: ');
        debug(JSON.stringify(state, null, 2));
      })
      .subscribe(state => this.errors$.next(state));

    this.subscribtion = Observable.fromEvent(
      this.client,
      'connectionStateChanged'
    )
      .do(state => debug('Deepstream client connection state: ', state))
      .subscribe(state => this.states$.next(state));

    return loginSubject;
  }

  close(): Observable<void> {
    // Unsubscribe from the active subscribtions
    if (this.subscribtion) {
      this.subscribtion.unsubscribe();
    }

    if (this.errorSubscribtion) {
      this.errorSubscribtion.unsubscribe();
    }

    // Call the native close event
    if (this.client && this.isClosed() !== true) {
      const obs$ = Observable.create(observer => {
        this.client.on('connectionStateChanged', state => {
          if (state === 'CLOSED') {
            observer.next();
            observer.complete();
          }
        });
        this.client.close();
      }).do(() => debug('Deepstream client is closed'));

      return obs$;
    }
    return Observable.of(undefined);
  }

  isClosed(): boolean {
    return (
      this.client &&
      this.client.getConnectionState() ===
        deepstream.CONSTANTS.CONNECTION_STATE.CLOSED
    );
  }

  isConnected(): boolean {
    return (
      this.client &&
      this.client.getConnectionState() ===
        deepstream.CONSTANTS.CONNECTION_STATE.OPEN
    );
  }
}

export default DsClient;
