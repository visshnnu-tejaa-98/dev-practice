import express from "express";
import ApiResponse from "./common/utils/api-response";
import { NotFoundError } from "./common/utils/api-error";
import { errorMiddleWare } from "./common/utils/error.middleware";

const createExpressApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/health", (req, res) => {
    return ApiResponse.success(res, "API is healthy");
  });

  app.use((req, res, next) => {
    next(new NotFoundError(`Route ${req.originalUrl} not found`));
  });

  app.use(errorMiddleWare);

  return app;
};

export default createExpressApp;
