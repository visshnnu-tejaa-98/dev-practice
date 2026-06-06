import express from "express";
import { authorize, getKeys } from "./oidc.controller";

const router = express.Router();

router.get("/jwks.json", getKeys);
router.get("/authorize", authorize);

export default router;
