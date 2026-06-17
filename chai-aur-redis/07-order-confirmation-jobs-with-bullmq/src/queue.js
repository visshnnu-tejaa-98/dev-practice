import { Queue } from "bullmq";

const connection = {
  host: "localhost",
  port: 6359,
};

const emailQueue = new Queue("emails", { connection });

export { emailQueue, connection };
