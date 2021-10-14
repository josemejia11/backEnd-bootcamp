const environment = require("./config");
const mongoose = require("./config/mongoose");
const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const path = require("path");
const socketIo = require("socket.io");
const routes = require("./routes");

const server = http.createServer(app);
const io = socketIo(server, { withCredentials: true, cors: { origin: "*" } });
io.on("connection", (socket) => {
  console.log("New web socket connection");
  require("./sockets/likes.socket")(io, socket);
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use("/", routes);

// Public path
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

// Listening
const port = environment.port || 3000;
server.listen(port, () => {
  console.log("App is listening on port " + port);
});

module.exports = {app, server};