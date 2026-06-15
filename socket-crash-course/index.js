import { createServer } from "node:http";
import { Server } from "socket.io";
import path from "path";
import express from "express";
import { fileURLToPath } from "node:url";

async function main() {
  const app = express();
  app.use(express.static(path.resolve("./public")));

  const server = createServer(app);
  const io = new Server();

  io.attach(server);

  io.on("connection", (socket) => {
    console.log("A new sockedt has connected!", socket.id);
    socket.on("user:message", (data) => {
      console.log("Message from socket", data);
      socket.broadcast.emit("server:message", data);
    });
  });

  const PORT = process.env.PORT || 9002;
  server.listen(PORT, () =>
    console.log(`🚀 Server is up and running in PORT ${PORT}`),
  );
}

main();
