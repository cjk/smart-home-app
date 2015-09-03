import io from 'socket.io-client';
import Event from '../events/event';

export default function(actionsOnEvent) {
  const socket = io.connect('http://localhost:4001');
  socket.emit('hello', {foo: 'whatever'});

  socket.on('KNX-event', (event) => {
    console.log('Received an event from our KNX-backend: ', new Date(event.created), event);
    const e = new Event(event);

    // Fire all given actions with an event-payload
    actionsOnEvent.forEach(action => action(e));

    // socket.emit('newMessage', {msg: 'The client is the new king!'});
  });

}
