const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const users = {};

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

  socket.on("register_user", (userId) => {
    // Remove any existing socket.id from users object
    const user = users[userId];
    if (user) {
      console.log("user already taken");
    } else {
      for (const [key, value] of Object.entries(users)) {
        if (value === socket.id) {
          delete users[key];
        }
      }
      // Add the new user mapping
      users[userId] = socket.id;
      console.log("Updated users:", users);
    }
  });

  socket.on("message", (message) => {
    console.log(`${socket.id} : ${message}`);
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected : ${socket.id}`);
  });
});

module.exports = httpServer;
