import os from 'os';

export const handleConnection = (socket, io) => {
  socket.on('create or join', roomId => {
    const clientsInRoom = io.sockets.adapter.rooms[roomId];
    const numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;

    if (numClients === 0) {
      socket.join(roomId);
      socket.emit('created', roomId, socket.id);

    } else if (numClients === 1) {
      io.sockets.in(roomId).emit('join', roomId);
      socket.join(roomId);
      socket.emit('joined', roomId, socket.id);
      io.sockets.in(roomId).emit('ready');
    } else {
      socket.emit('full', roomId);
    }
  });

  socket.on('ipaddr', () => {
    const ifaces = os.networkInterfaces();
    for (let dev in ifaces) {
      ifaces[dev].forEach((details) => {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address);
        }
      });
    }
  });

  socket.on('message', (message) => {
    socket.broadcast.emit('message', message);
  });
};
