import express from "express";
import { authorize, getKeys } from "./oidc.controller";
import { getUserProfile } from "../auth/auth.controller";

const router = express.Router();

router.get("/jwks.json", getKeys);
router.get("/authorize", authorize);
router.get("/userInfo", getUserProfile);

export default router;
