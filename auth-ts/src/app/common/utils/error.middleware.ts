import { NextFunction, Request, Response } from "express";

export const errorMiddleWare = (err: any, res: Response) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const errorCode = err.errorCode || "INTERNAL_SERVER_ERROR";

  const isProduction = process.env.NODE_ENV === "production";

  const response = {
    message: isProduction ? "Internal Server Error" : message,
    details: {
      code: errorCode,
      error:
        isProduction ? "An unexpected error occurred" : err.stack || message,
    },
  };

  res.status(statusCode).json(response);
};
