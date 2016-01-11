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
  socket.on('knx-event', (event) => {
    const e = new Event(event);

    // Fire all given actions with an event-payload
    actions.forEach(action => action(e));
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

export default function smartHomeConnect() {
  return {
    setupEventlistener: setupEventlistener,
    fetchInitialState: fetchInitialState,
    writeGroupAddr: writeGroupAddr,
    fetchFermenterState: fetchFermenterState,
    fetchFermenterHistory: fetchFermenterHistory,
  };
}
