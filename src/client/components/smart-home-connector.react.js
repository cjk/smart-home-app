import io from 'socket.io-client';
import Event from '../events/event';

export default function() {
  const socket = io.connect('http://localhost:4001');

  function setupEventlistener(actionsOnEvent) {
    socket.on('knx-event', (event) => {
      console.log('Received an event from our KNX-backend: ', new Date(event.created), event);
      const e = new Event(event);

      // Fire all given actions with an event-payload
      actionsOnEvent.forEach(action => action(e));
    });
  }

  function requestInitialState(actionToFire) {
    socket.on('initialstate', (state) => actionToFire(state));
    socket.emit('initialstate', {request: true});
  };

  return {
    setupEventlistener: setupEventlistener,
    requestInitialState: requestInitialState
  };

}
