import { Server } from "socket.io";
import { exec } from "child_process";
import Gpio from "onoff";

const gpio = Gpio.Gpio;
const aimant = new gpio(24, "in", "falling", { debounceTimeout: 25 });
let i = 0;

const io = new Server(8000, { cors: { origins: "*" } });
exec("npm run electron:serve");

io.on("connection", (socket) => {
  console.log("connected now");
  aimant.watch((err, value) => {
    if (err) throw err;
    i++;
    io.sockets.emit("timer", i);
  });
  socket.on("disconnect", () => {
    console.log(`disconnect ${socket.id}`);
  });
});
