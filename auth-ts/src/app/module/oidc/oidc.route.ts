import express from "express";
import { authorize, getKeys, registerClient } from "./oidc.controller";
import { getUserProfile } from "../auth/auth.controller";
import {
  adminOnly,
  restrictToAuthenticatedUser,
} from "../auth/auth.middleware";

const router = express.Router();

router.get("/jwks.json", getKeys);
router.get("/authorize", authorize);
router.get("/userInfo", getUserProfile);
router.post(
  "/register-client",
  restrictToAuthenticatedUser(),
  adminOnly(),
  registerClient,
);

export default router;
