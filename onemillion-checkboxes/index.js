import "dotenv/config";
import { createServer } from "node:http";
import path from "node:path";
import express from "express";
import { Server } from "socket.io";
import { publisher, subscriber, redis } from "./redis-config.js";

async function main() {
  const app = express();
  app.use(express.static(path.resolve("./public")));

  const server = createServer(app);
  const io = new Server();
  const CHECKBOX_DB_KEY = "checkbox:db";

  io.attach(server);

  const rateLimitHashMap = new Map();

  await subscriber.subscribe("internal-server:checkbox:change");
  subscriber.on("message", (channel, message) => {
    const data = JSON.parse(message);
    io.emit("db:data", data);
  });

  io.on("connection", async (socket) => {
    const rawData = await redis.get(CHECKBOX_DB_KEY);
    if (rawData) {
      socket.emit("db:data", JSON.parse(rawData));
    } else {
      socket.emit("db:data", []);
    }

    socket.on("user:click", async (data) => {
      const rawData = await redis.get(CHECKBOX_DB_KEY);

      if (rateLimitHashMap.has(`user:click:${socket.id}`)) {
        const lastOperationTime = await redis.get(`rate-limiting:${socket.id}`);

        if (lastOperationTime) {
          const timeElapsed = Date.now() - lastOperationTime;
          if (timeElapsed < 5.5 * 1000) {
            socket.emit("click:error", { error: "Please wait!" });
            return;
          }
        }
      }
      await redis.set(`rate-limiting:${socket.id}`, Date.now());
      if (rawData) {
        const remoteData = JSON.parse(rawData);

        socket.emit("db:data", JSON.parse(rawData));

        if (!remoteData.includes(data.id)) {
          remoteData.push(data.id);
        } else {
          let index = remoteData.indexOf(data.id);
          remoteData.splice(index, 1);
        }

        await redis.set(CHECKBOX_DB_KEY, JSON.stringify(remoteData));

        await publisher.publish(
          "internal-server:checkbox:change",
          JSON.stringify(remoteData),
        );
      }
    });
  });

  const PORT = process.env.PORT || 9000;

  server.listen(PORT, () =>
    console.log(`🚀 Server is up and running at port ${PORT}`),
  );
}

main();
