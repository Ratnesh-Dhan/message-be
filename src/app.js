const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const routes = require("./routes/index.js");

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "*",
    methods: ["GET", "POST"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    allowedHeaders: ["*"],
    credentials: true,
  },
});
// const io = new Server(httpServer);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    allowedHeaders: ["*"],
    credentials: true,
  })
);

app.use("/", routes);

io.on("connection", (socket) => {
  console.log(`user connected : ${socket.id}`);

  socket.on("message", (message) => {
    console.log(message);
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected : ${socket.id}`);
  });
});

module.exports = httpServer;
