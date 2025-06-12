import express from "express";
import { getTags } from "../controllers/tag-controller";
import { getAuthMiddleware } from "../middleware/auth";

const authMiddleware = getAuthMiddleware();
const router = express.Router();

router.get("/", authMiddleware, getTags); // Get all tags

export default router;
