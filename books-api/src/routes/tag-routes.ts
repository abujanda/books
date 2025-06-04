import express from "express";
import { getTags } from "../controllers/tag-controller";
import { authMiddleWare as firebaseMiddleware } from "../middleware/auth/firebase-auth-middleware";
import { authMiddleware as jwtMiddleware } from "../middleware/auth/jwt-auth-middleware";

const router = express.Router();

router.get("/", getTags); // Get all tags

export default router;
