import io from 'socket.io-client';

export default function(eventActions) {
  const socket = io.connect('http://localhost:4001');
  socket.emit('hello', {foo: 'whatever'});

  socket.on('KNX-event', (event) => {
    console.log('Received an event: ', new Date(event.created), event);
    eventActions.newEventReceived(event);
    // socket.emit('newMessage', {msg: 'The client is the new king!'});
  });

}
