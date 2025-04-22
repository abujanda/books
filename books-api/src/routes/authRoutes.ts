import express from "express";
import {
  getUserProfile,
  signInUser,
  signUpUser,
} from "../controllers/authController";

const router = express.Router();

router.get("/:id", getUserProfile);
router.post("/signin", signInUser);
router.post("/signup", signUpUser);

export default router;
