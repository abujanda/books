import express from "express";
import {
  getUserProfile,
  me,
  signIn,
  signUp,
} from "../../controllers/auth/jwt-auth-controller";
import { authMiddleware } from "../../middleware/auth/jwt-middleware";

const router = express.Router();

//router.get("/:id", authMiddleware, getUserProfile);
router.get("/me", authMiddleware, me);
router.post("/signin", signIn);
router.post("/signup", signUp);

export default router;
