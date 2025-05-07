import express from "express";
import {
  getUserProfile,
  me,
  signInUser,
  signUpUser,
} from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/:id", authMiddleware, getUserProfile);
router.get("/me", authMiddleware, me);
router.post("/signin", signInUser);
router.post("/signup", signUpUser);

export default router;
