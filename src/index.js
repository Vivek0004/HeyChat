const path = require("path");
const http = require("http");

const socketio = require("socket.io");
const express = require("express");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 3000;
const documentDirPath = path.join(__dirname, "../public");

app.use(express.static(documentDirPath));


io.on("connection", (socket) => {

    socket.emit('message', 'Welcome to ChatSome')

    socket.broadcast.emit('message', 'A new user just joined')

    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })

    socket.on('sendLocation', (coords) => {
      io.emit('message','https://google.com/maps?q='+ coords.latitude+','+coords.longitude)
    })

    socket.on('disconnect', () => {
      io.emit('message','a user has left!')
    })
});

server.listen(port, () => {
  console.log("Server is up on port " + port);
});
