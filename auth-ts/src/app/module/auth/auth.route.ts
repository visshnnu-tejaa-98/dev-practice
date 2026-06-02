import express from "express";
import { loginUser, registerUser, verifyUserEmail } from "./auth.controller";
import { validate } from "../../common/zod/zod.midleware";
import { loginSchema, registerSchema, verifyEmailSchema } from "./auth.schema";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/verify", validate(verifyEmailSchema), verifyUserEmail);
router.post("/login", validate(loginSchema), loginUser);

export default router;
