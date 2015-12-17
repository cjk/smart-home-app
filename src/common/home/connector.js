/* TODO: Move to components- or lib-directory */
import io from 'socket.io-client';
import Event from '../events/event';
import Promise from 'bluebird';

const config = {
  host: 'localhost',
  port: 4001
};

const socket = io.connect(`http://${config.host}:${config.port}`);

function setupEventlistener(...actions) {
  console.log('Setting up home-BUS event-listener with actions: ', actions);
  socket.on('knx-event', (event) => {
    console.log('Received an event from our KNX-backend: ', new Date(event.created), event);
    const e = new Event(event);

    // Fire all given actions with an event-payload
    actions.forEach(action => action(e));
  });
};

function fetchInitialState() {
  const promise = new Promise((resolve) => {
    socket.on('initialstate', (state) => resolve(state));
  });

  socket.emit('initialstate', {request: true});
  return promise;
};

function writeGroupAddr(addr) {
  console.log('Sending groupaddress write-request over the wire: ', addr);

  const promise = new Promise((resolve) => {
    socket.emit('writeToBus', addr, resolve(addr));
  });
  return promise;
}

export default function smartHomeConnect() {
  return {
    setupEventlistener: setupEventlistener,
    fetchInitialState: fetchInitialState,
    writeGroupAddr: writeGroupAddr
  };
}
