import io from 'socket.io-client';
import Event from './event';
import Promise from 'bluebird';

const config = {
  host: 'zircon',
  port: 4001
};

const socket = io.connect(`http://${config.host}:${config.port}`);

export function setupEventlistener(...actions) {
  console.log('Setting up home-BUS event-listener with actions: ', actions);
  socket.on('knx-event', (event) => {
    console.log('Received an event from our KNX-backend: ', new Date(event.created), event);
    const e = new Event(event);

    // Fire all given actions with an event-payload
    actions.forEach(action => action(e));
  });
};

export function fetchInitialState() {
  const promise = new Promise((resolve) => {
    socket.on('initialstate', (state) => resolve(state));
  });

  socket.emit('initialstate', {request: true});
  return promise;
};

/* FIXME: Cleanup */
/* function writeGroupAddr(addr) {
   socket.emit('writeToBus', addr);
   return this;
   };

   return {
   setupEventlistener: setupEventlistener,
   requestInitialState: requestInitialState,
   writeGroupAddr: writeGroupAddr,
   };
 */
