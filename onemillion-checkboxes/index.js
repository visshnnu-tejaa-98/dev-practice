import "dotenv/config";
import { createServer } from "node:http";
import path from "node:path";
import express from "express";
import { Server } from "socket.io";

async function main() {
  const app = express();
  app.use(express.static(path.resolve("./public")));

  const server = createServer(app);
  const io = new Server();

  io.attach(server);

  const db = new Set();

  io.on("connection", (socket) => {
    // console.log("Socked connected", socket.id);
    socket.emit("db:data", Array.from(db));
    socket.on("user:click", (data) => {
      if (!db.has(data.id)) {
        db.add(data.id);
      } else {
        db.delete(data.id);
      }
      io.emit("db:data", Array.from(db));
    });
  });

  const PORT = process.env.PORT || 9000;

  server.listen(PORT, () =>
    console.log(`🚀 Server is up and running at port ${PORT}`),
  );
}

main();
