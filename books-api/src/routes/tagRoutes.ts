import express from "express";
import { getTags } from "../controllers/tagController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getTags); // Get all tags

export default router;
