import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import { handleConnection } from './socket';

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  handlePreflightRequest(req, res) {
    res.writeHead(200, { 'Access-Control-Allow-Origin': "localhost:3000" });
    res.end();
  },
});
io.origins(['localhost:3000']);
const PORT = 3001;

io.on('connection', socket => {
  handleConnection(socket, io);
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log("Server started on port: ", PORT);
});
