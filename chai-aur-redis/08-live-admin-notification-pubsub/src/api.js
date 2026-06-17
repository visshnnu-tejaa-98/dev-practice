import express from "express";
import { Redis } from "ioredis";
import { emailQueue } from "./queue.js";

// check this video here how to run this?
// https://www.youtube.com/watch?v=UHpUq-Mvvkc&list=PLxamJ86SDCj28nzE9l6frczaVhPX7P7o7&index=7

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
