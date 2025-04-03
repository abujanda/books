import express from "express";
import { getUserProfile, registerUser, signInUser } from "../controllers/authController";

const router = express.Router();

router.get("/:id", getUserProfile);
router.post("/register", registerUser);
router.post("/signin", signInUser);

export default router;