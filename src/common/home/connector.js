/* TODO: Move to components- or lib-directory */
import io from 'socket.io-client';
import Event from '../events/event';
import Promise from 'bluebird';

const config = {
  host: 'localhost',
  port: 4001
};

const socket = io.connect(`http://${config.host}:${config.port}`);

socket
  .on('connect', () => console.log(`Connected to smart-home-backend.`))
  .on('connect_error', () => console.log(`ERROR connecting to smart-home-backend!`))
  .on('connect_timeout', () => console.log(`TIMEOUT connecting to smart-home-backend!`));

function setupEventlistener(eventAction) {
  socket.on('knx-event', (event) => {
    const e = new Event(event);
    eventAction(e);
  });
}

function fetchInitialState() {
  const promise = new Promise((resolve) => {
    socket.on('initialstate', (state) => resolve(state));
  });

  socket.emit('initialstate', {request: true});
  return promise;
}

function writeGroupAddr(addr) {
  const promise = new Promise((resolve) => {
    socket.emit('writeToBus', addr, resolve(addr));
  });
  return promise;
}

function fetchFermenterState() {
  const promise = new Promise((resolve) => {
    socket.on('fermenterstate', (state) => resolve(state));
  });

  socket.emit('fermenterstate', {request: true});
  return promise;
}

function fetchFermenterHistory() {
  const promise = new Promise((resolve) => {
    socket.on('fermenterhistory', (state) => resolve(state));
  });

  socket.emit('fermenterhistory', {request: true});
  return promise;
}

export default function connector() {
  return {
    setupEventlistener: setupEventlistener,
    fetchInitialState: fetchInitialState,
    writeGroupAddr: writeGroupAddr,
    fetchFermenterState: fetchFermenterState,
    fetchFermenterHistory: fetchFermenterHistory,
  };
}
