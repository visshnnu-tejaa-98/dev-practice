import express from "express";
import { Redis } from "ioredis";

// Constants
const PORT = 9000;
const BANNER_KEY = "app:banner";
const EMAIL_KEY = "queue:emails";

// Configurations
const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6359");

// FUnctions
const otpKey = (phone) => {
  return `otp:${phone}`;
};

const userKey = (id) => {
  return `user:${id}:json`;
};

// Routes
app.get("/redis", async (req, res) => {
  const reply = await redis.ping();
  res.json({ reply });
});

app.post("/banner", async (req, res) => {
  const { content } = req.body;
  await redis.set(BANNER_KEY, content);
  res.json({ message: `Banner name saved` });
});

app.get("/banner", async (req, res) => {
  const name = await redis.get(BANNER_KEY);
  res.json({ message: name });
});

app.get("/banner/exists", async (req, res) => {
  const name = await redis.exists(BANNER_KEY);
  res.json({ message: name });
});

app.delete("/banner", async (req, res) => {
  await redis.del(BANNER_KEY);
  res.json({ message: "Deleted" });
});

app.post("/otp", async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await redis.set(otpKey(phone), otp, "EX", 30);
  res.json({ message: `otp generated`, otp });
});

app.get("/otp/verify", async (req, res) => {
  const { phone, otp: userOtp } = req.body;

  const rawOtp = await redis.get(otpKey(phone));
  if (userOtp === rawOtp) res.json({ message: `otp generated`, otp });
  else res.json({ message: `Invalid` });
});

app.get("/otp/:phone/ttl", async (req, res) => {
  const { phone } = req.params;

  const ttl = await redis.ttl(otpKey(phone));
  res.json({ message: ttl });
});

app.post("/user/:id/json", async (req, res) => {
  const { id } = req.params;
  const user = {
    id: 123,
    name: "Visshnnu Tejaa",
    age: 27,
  };

  const savedUser = await redis.set(userKey(id), JSON.stringify(user));
  res.json({ user: savedUser });
});

app.get("/user/:id/json", async (req, res) => {
  const { id } = req.params;

  const user = await redis.get(userKey(id));
  res.json({ user: JSON.parse(user) });
});

app.post("/user/:id/hash", async (req, res) => {
  const { id } = req.params;
  const user = {
    id: "123",
    name: "Visshnnu Tejaa",
    age: "27",
  };

  const savedUser = await redis.hset(userKey(id), user);
  res.json({ user: savedUser });
});

app.get("/user/:id/hash", async (req, res) => {
  const { id } = req.params;

  const user = await redis.hgetall(userKey(id));
  res.json({ user });
});

app.delete("/user/:id/hash", async (req, res) => {
  const { id } = req.params;
  await redis.del(userKey(id));
  res.json({ message: "deleted" });
});

app.post("/emails", async (req, res) => {
  const emailJob = {
    to: "vt@gmail.com",
    subject: "This is the subject line",
    body: "this is the sample body",
  };
  const data = await redis.lpush(EMAIL_KEY, JSON.stringify(emailJob));
  res.json({ data });
});

app.get("/emails", async (req, res) => {
  const data = await redis.rpop(EMAIL_KEY);
  console.log(data);
  res.json({ data: JSON.parse(data) });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is up and running at PORT ${9000}`);
});
