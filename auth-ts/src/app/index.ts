import express from "express";

const createExpressApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/health", (req, res) => {
    res.send("ok");
  });

  return app;
};

export default createExpressApp;
