/* TODO: Move to components- or lib-directory */
import io from 'socket.io-client';
import Event from '../events/event';
import Promise from 'bluebird';

const config = {
  host: '192.168.0.28', /* NOTE: zircon.local is not available on HOME-LAN! :( */
  port: 4001
};

const socket = io.connect(`http://${config.host}:${config.port}`);

socket
  .on('connect', () => console.log(`Connected to smart-home-backend on <${config.host}:${config.port}>`))
  .on('connect_error', () => console.log(`ERROR connecting to smart-home-backend on <${config.host}:${config.port}>`))
  .on('connect_timeout', () => console.log(`TIMEOUT connecting to smart-home-backend on <${config.host}:${config.port}>!`));

function subscribeToBusEvents(eventAction) {
  socket.on('knx-event', (event) => {
    const e = new Event(event);
    eventAction(e);
  });
}

function subscribeToFermenterState(eventAction) {
  socket.on('fermenterstate', (event) => {
    eventAction(event);
  });

  /* No emit necessary, our backend is automatically sending us
     fermeter-state-events on successful (socket-) connection */

  // socket.emit('fermenterstate', { request: true });
}

function fetchInitialState() {
  const promise = new Promise((resolve) => {
    socket.on('initialstate', (state) => resolve(state));
  });

  socket.emit('initialstate', { request: true });
  return promise;
}

function writeGroupAddr(addr) {
  const promise = new Promise((resolve) => {
    socket.emit('writeToBus', addr, resolve(addr));
  });
  return promise;
}

function fetchFermenterHistory() {
  const promise = new Promise((resolve) => {
    socket.on('fermenterhistory', (state) => resolve(state));
  });

  socket.emit('fermenterhistory', { request: true });
  return promise;
}

export default function connector() {
  return {
    subscribeToBusEvents,
    subscribeToFermenterState,
    fetchInitialState,
    writeGroupAddr,
    fetchFermenterHistory,
  };
}
