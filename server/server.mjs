import { Server } from "socket.io";
import { exec } from "child_process";
import Gpio from "onoff";

const gpio = Gpio.Gpio;
const aimant = new gpio(24, "in", "falling", { debounceTimeout: 25 });

const io = new Server(8000, { cors: { origins: "*" } });
exec("npm run electron:serve");

let date = new Date();
let difference, now;

io.on("connection", (socket) => {
  console.log("connected now");
  aimant.watch((err, value) => {
    if (err) throw err;
    if (value === 0) {
      now = new Date();
      difference = now - date;
      if (difference >= 15) io.sockets.emit("timer");
      date = now;
    }
  });
  socket.on("disconnect", () => {
    console.log(`disconnect ${socket.id}`);
  });
});
