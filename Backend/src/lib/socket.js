import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const ORIGIN = process.env.CLIENT_URL || "http://localhost:5173";

const io = new Server(server, {
  cors: {
<<<<<<< HEAD
    origin: ORIGIN,
    methods: ["GET", "POST"],
    credentials: true, // 🔑 allow cookies/tokens
=======
    origin: ["https://update-chat-app-1.onrender.com"],
>>>>>>> 4585877d23197c797a15d5b7da46cbfb9ca9f912
  },
});

// used to store online users { userId: socketId }
const userSocketMap = {};

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// helper to check if user is online
export function isUserOnline(userId) {
  return Boolean(userSocketMap[userId]);
}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // notify all clients of current online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
