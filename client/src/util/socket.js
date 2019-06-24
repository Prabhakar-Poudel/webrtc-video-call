import io from 'socket.io-client';

const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log("connected to socket server");
});

socket.on('ipaddr', function(ipaddr) {
  alert('Server IP address is ' + ipaddr);
});

export const joinRoom = (roomID, onRoomJoin, toNameIt) => {
  socket.emit('create or join', roomID);
  socket.on('created', (room, clientId) => {
    console.log("created event")
    onRoomJoin();
  });
  socket.on('joined', (room, clientId) => {
    console.log("joined event")
    onRoomJoin();
  });
  socket.on('join', room => {
    console.log("never called")
    toNameIt();
  });
  socket.on('full', (room) => {
    alert('Room ' + room + ' is full :^(');
  });
};

export const sendMessage = message => {
  console.log("sending message", message)
  socket.emit('message', message);
};

export const attachMessageHandler = handler => {
  console.log("handler attach called")
  socket.on('message', handler);
}
