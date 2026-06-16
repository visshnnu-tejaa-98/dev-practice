import express from "express";
import { Redis } from "ioredis";

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6359");

// set -> store single vriable
// hset -> store object
// hgetall -> like getting entire object

app.get("/redis", async (req, res) => {
  const reply = await redis.ping();
  res.json({ redis: reply });
});

app.post("/user/:id/json", async (req, res) => {
  const key = `user:${req.params.id}:json`;
  const value = req.body;

  await redis.set(key, JSON.stringify(value));
  res.json({ savedAs: "json" });
});

app.get("/user/:id/json", async (req, res) => {
  const key = `user:${req.params.id}:json`;
  const session = await redis.get(key);

  res.json({ session: session ? JSON.parse(session) : null });
});

app.post("/user/:id/hash", async (req, res) => {
  const key = `user:${req.params.id}:hash`;
  const value = req.body;

  await redis.hset(key, value);
  res.json({ savedAs: "hash" });
});

app.get("/user/:id/hash", async (req, res) => {
  const key = `user:${req.params.id}:hash`;
  const session = await redis.hgetall(key);

  res.json({ session: session });
});

app.listen(9000, () => console.log("Server is up and running at port 9000"));
