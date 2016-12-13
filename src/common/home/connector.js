/* @flow */
/* eslint no-console: "off" */

/* TODO: Move to components- or lib-directory */
import io from 'socket.io-client';
import Promise from 'bluebird';
import type { KnxAddress } from '../types';

const config = {
  host: 'localhost', /* NOTE: Must use IP-address i.e. 192.168.1.28, zircon.local is not available on HOME-LAN! :( */
  port: 4001
};

const socket = io.connect(`http://${config.host}:${config.port}`);

socket
  .on('connect', () =>
    console.log(`Connected to smart-home-backend on <${config.host}:${config.port}>`))
  .on('connect_error', () =>
    console.log(`ERROR connecting to smart-home-backend on <${config.host}:${config.port}>`))
  .on('connect_timeout', () =>
    console.log(`TIMEOUT connecting to smart-home-backend on <${config.host}:${config.port}>!`))
  .on('close', () =>
    console.log('#### CLOSE'))
  .on('disconnect', () =>
    /* Could cleanup resources here, once needed  */
    console.log('#### DISCONNECT'))
  .on('error', () =>
    console.log('#### ERROR'));

function subscribeToBusEvents(eventAction: Function) {
  socket.on('knx-event', (event) => {
    eventAction(event);
  });
}

function subscribeToFermenterState(eventAction: Function) {
  socket.on('fermenter-state', (event) => {
    eventAction(event);
  });

  /* No emit necessary, our backend is automatically sending us
     fermeter-state-events on successful (socket-) connection */
}

function fetchInitialState() {
  const promise = new Promise((resolve) => {
    socket.on('initialstate', state => resolve(state));
  });

  socket.emit('initialstate', { request: true });
  return promise;
}

function writeGroupAddr(addr: KnxAddress) {
  const promise = new Promise((resolve) => {
    socket.emit('writeToBus', addr, resolve(addr));
  });
  return promise;
}

function sendFermenterCommand(cmd: string) {
  const promise = new Promise((resolve) => {
    socket.emit('fermenterCommand', cmd, resolve(cmd));
  });
  return promise;
}

function fetchFermenterHistory() {
  const promise = new Promise((resolve) => {
    socket.on('fermenterhistory', state => resolve(state));
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
    sendFermenterCommand,
    fetchFermenterHistory,
  };
}
