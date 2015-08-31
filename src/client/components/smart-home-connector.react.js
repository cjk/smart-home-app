import io from 'socket.io-client';

export default function() {
  const socket = io.connect('http://localhost:4001');
  socket.emit('hello', {foo: 'whatever'});

  socket.on('KNX-event', (event) => {
    console.log('Received an event: ', event);
    // socket.emit('newMessage', {msg: 'The client is the new king!'});
  });

}
