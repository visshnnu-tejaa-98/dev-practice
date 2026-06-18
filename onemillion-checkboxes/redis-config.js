import { Redis } from "ioredis";

const createRedisConnection = () => {
  return new Redis({
    host: "localhost",
    port: 6359,
  });
};

export const redis = createRedisConnection();

export const publisher = createRedisConnection();

export const subscriber = createRedisConnection();
