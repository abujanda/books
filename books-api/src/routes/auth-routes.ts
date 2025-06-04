import express from "express";
import {
  getUserProfile,
  me,
  signInUser,
  signUpUser,
} from "../controllers/auth-controller";
import { authMiddleWare as firebaseMiddleware } from "../middleware/auth/firebase-auth-middleware";
import { authMiddleware as jwtMiddleware } from "../middleware/auth/jwt-auth-middleware";

const router = express.Router();

//router.get("/:id", authMiddleware, getUserProfile);
router.get("/me", jwtMiddleware, me);
router.post("/signin", signInUser);
router.post("/signup", signUpUser);

export default router;
