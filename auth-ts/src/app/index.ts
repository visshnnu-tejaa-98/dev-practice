import express from "express";
import type { Request, Response } from "express";
import ApiResponse from "./common/utils/api-response";
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from "./common/utils/api-error";
import { errorMiddleWare } from "./common/utils/error.middleware";
import { registerSchema } from "./module/auth/auth.schema";
import { validateRegisterInputData } from "./module/auth/auth.validation";
import db from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { checkUserWithEmailExists, insertUser } from "./module/auth/auth.utils";
import bcrypt from "bcryptjs";
import {
  generateSalt,
  generateVerifyEmailToken,
  hash,
  hashToken,
} from "./common/utils/jwt";
import { sendVerificationEmail } from "./common/config/nodemailer";
import { registerUser } from "./module/auth/auth.controller";

const createExpressApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/health", (req, res) => {
    return ApiResponse.success(res, "API is healthy");
  });

  app.post("/api/auth/register", registerUser);

  app.use((req, res, next) => {
    next(new NotFoundError(`Route ${req.originalUrl} not found`));
  });

  app.use(errorMiddleWare);

  return app;
};

export default createExpressApp;
