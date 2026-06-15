import http, { createServer } from "node:http";
import { Server } from "socket.io";

async function main() {
  const server = createServer();
  const io = new Server();

  io.attach(server);

  const PORT = process.env.PORT || 6000;
  server.listen(PORT, () =>
    console.log(`🚀 Server is up and running in PORT ${PORT}`),
  );
}

main();
