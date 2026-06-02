import express from "express";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  profile,
  registerUser,
  verifyUserEmail,
  resetPassword,
} from "./auth.controller";
import { validate } from "../../common/zod/zod.midleware";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchemaFromBody,
  resetPasswordSchemaFromParams,
  verifyEmailSchema,
} from "./auth.schema";
import { restrictToAuthenticatedUser } from "./auth.middleware";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/verify", validate(verifyEmailSchema), verifyUserEmail);
router.post("/login", validate(loginSchema), loginUser);
router.get("/profile", restrictToAuthenticatedUser(), profile);
router.post("/logout", restrictToAuthenticatedUser(), logoutUser);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post(
  "/reset-password",
  validate(resetPasswordSchemaFromBody, "body"),
  validate(resetPasswordSchemaFromParams, "query"),
  resetPassword,
);

export default router;
