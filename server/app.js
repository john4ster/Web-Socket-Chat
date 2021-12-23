const express = require('express');
const http = require('http');

const app = express();
const port = 3001;
const server = http.createServer(app);

const env = require('dotenv').config();

const io = require('socket.io')(server, {
  cors: {
    origin: process.env.localhost,
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('sendMessage', (message) => { //A client sent a new message
      io.emit('updateMessages', message); //Emit that message back to the front end
  })

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  })
});

server.listen(port, () => {
  console.log('Listening on port ' + port);
});