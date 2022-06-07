import { Server } from "socket.io";
import { exec } from "child_process";

const io = new Server(8000, {cors: {origins: '*'}});
exec("npm run electron:serve");

io.on("connection", (socket) => {
  console.log(`connect ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`disconnect ${socket.id}`);
  });
});
