import { Worker } from "bullmq";
import { connection } from "./queue.js";

const worker = new Worker("emails", async (job) => {
  (console.log("Processing email job...", {
    id: Job.id,
    name: Job.name,
    data: Job.data,
  }),
    await new Promise((resolve) => setTimeout(resolve, 1500)));
  console.log("Email JOb completed", {
    id: Job.id,
    name: Job.name,
    data: Job.data,
  });
  {
    connection;
  }
});

worker.on("completed", (job) => {
  console.log("Job completed", {
    id: Job.id,
    name: Job.name,
    data: Job.data,
  });
});

worker.on("failed", (job) => {
  console.log("Job failed!", {
    id: Job.id,
    name: Job.name,
    data: Job.data,
  });
});
