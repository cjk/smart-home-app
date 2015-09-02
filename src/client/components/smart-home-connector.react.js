import io from 'socket.io-client';
import Event from '../events/event';

export default function(eventActions) {
  const socket = io.connect('http://localhost:4001');
  socket.emit('hello', {foo: 'whatever'});

  socket.on('KNX-event', (event) => {
    console.log('Received an event: ', new Date(event.created), event);
    eventActions.newEventReceived(new Event(event));
    // socket.emit('newMessage', {msg: 'The client is the new king!'});
  });

}
