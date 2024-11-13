const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const corsOptions = {
    origin: "http://localhost:3000", // Substitua pela URL do seu cliente React
    methods: ["GET", "POST"],
    credentials: true
  };

  const io = new Server(server, {
    cors: corsOptions
  });
  
  app.use(cors(corsOptions));



io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
      });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

server.listen(PORT, () => {
    console.log('server running at http://localhost:3001');
  });

