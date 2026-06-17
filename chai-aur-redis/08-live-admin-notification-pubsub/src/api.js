import express from "express";
import { Redis } from "ioredis";
import { emailQueue } from "./queue.js";

const app = express();
app.use(express.json());

const publisher = new Redis(process.env.REDIS_URL || "redis://localhost:6359");

app.post("/notifications", async (req, res) => {
  const payload = {
    title: req.body.title || "Default Payload",
    createdAt: new Date().toISOString(),
  };
  const revievers = await publisher.publish(
    "notification",
    JSON.stringify(payload),
  );
  res.json({ message: "Notification sent to" + revievers + "Subscribers" });
});

app.listen(9000, () => console.log("Server is up and running at port 9000"));
