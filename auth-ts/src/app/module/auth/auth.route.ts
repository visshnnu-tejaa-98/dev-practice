import express from "express";
import {
  loginUser,
  profile,
  registerUser,
  verifyUserEmail,
} from "./auth.controller";
import { validate } from "../../common/zod/zod.midleware";
import { loginSchema, registerSchema, verifyEmailSchema } from "./auth.schema";
import { restrictToAuthenticatedUser } from "./auth.middleware";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/verify", validate(verifyEmailSchema), verifyUserEmail);
router.post("/login", validate(loginSchema), loginUser);
router.get("/profile", restrictToAuthenticatedUser(), profile);

export default router;
