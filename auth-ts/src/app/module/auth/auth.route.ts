import express from "express";
import { registerUser, verifyUserEmail } from "./auth.controller";
import { validate } from "../../common/zod/zod.midleware";
import { registerSchema, verifyEmailSchema } from "./auth.schema";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/verify", validate(verifyEmailSchema), verifyUserEmail);

export default router;
