const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 3000;
const documentDirPath = path.join(__dirname, "../public");

app.use(express.static(documentDirPath));


io.on("connection", (socket) => {
  console.log("New Websocket Connection");
//   socket.emit("countUpdated", count);
//   socket.on("increment", () => {
//     count++;
//     io.emit("countUpdated", count);
//   });
    socket.emit('message', 'Welcome to ChatSome')
    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })
});

server.listen(port, () => {
  console.log("Server is up on port " + port);
});
