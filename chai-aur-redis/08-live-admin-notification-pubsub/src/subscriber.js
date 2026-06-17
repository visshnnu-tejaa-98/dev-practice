import { Redis } from "ioredis";

const subscriber = new Redis(process.env.REDIS_URL || "redis://localhost:6359");

subscriber.subscribe("notifications", (err) => {
  if (err) {
    console.log("Failed tpo subscribe", err.message);
    return;
  }
  console.log("Subscribed successfully");
});

subscriber.on("message", (channel, message) => {
  console.log("Recieved on ", channel, ":", JSON.parse(message));
});
