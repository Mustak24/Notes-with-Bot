import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
    });

    io.of("/global-chat").on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("message", (message, sender, time) => {
        socket.broadcast.emit("message", message, sender, time);
      });

      socket.on("disconnect", () => {
        socket.broadcast.emit('disconnet', socket.id);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}