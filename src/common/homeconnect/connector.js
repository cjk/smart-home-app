import io from 'socket.io-client';
import Event from './event';

const config = {
  host: 'zircon',
  port: 4001
};

export default function() {
  const socket = io.connect(`http://${config.host}:${config.port}`);

  function setupEventlistener(actionsOnEvent) {
    console.log('Setting up home-BUS event-listener...');
    socket.on('knx-event', (event) => {
      console.log('Received an event from our KNX-backend: ', new Date(event.created), event);
      const e = new Event(event);

      // Fire all given actions with an event-payload
      actionsOnEvent.forEach(action => action(e));
    });
    return this;
  }

  function requestInitialState(actionToFire) {
    socket.on('initialstate', (state) => actionToFire(state));
    socket.emit('initialstate', {request: true});

    return this;
  };

  function writeGroupAddr(addr) {
    socket.emit('writeToBus', addr);
    return this;
  };

  setupEventlistener();

  return {
    setupEventlistener: setupEventlistener,
    requestInitialState: requestInitialState,
    writeGroupAddr: writeGroupAddr,
  };

}
