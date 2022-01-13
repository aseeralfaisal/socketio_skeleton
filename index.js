const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = 5000 || process.env.PORT

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log("A user connected")
  socket.on('disconnect', (socket) => {
    console.log("A user disconnected")
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});