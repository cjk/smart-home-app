import io from 'socket.io-client';
import Event from './event';

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

/* FIXME: Cleanup */
/* function requestInitialState(actionToFire) {
   socket.on('initialstate', (state) => actionToFire(state));
   socket.emit('initialstate', {request: true});

   return this;
   };

   function writeGroupAddr(addr) {
   socket.emit('writeToBus', addr);
   return this;
   };

   return {
   setupEventlistener: setupEventlistener,
   requestInitialState: requestInitialState,
   writeGroupAddr: writeGroupAddr,
   };
*/
