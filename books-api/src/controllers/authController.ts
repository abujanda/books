import { Request, Response } from "express";
import * as authService from "../services/authService";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const userProfile = await authService.getUserProfile(userId);
    if (userProfile) {
      res.status(200).json(userProfile);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error fetching user profile: " + error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authService.signInUser(email, password);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error signing in user: " + error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

export const signUpUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const newUser = await authService.signUpUser(userData);
    res.status(201).json(newUser);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error registering user: " + error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const { userId } = (req as any).user; // Assuming the user ID is stored in req.user
    const currentUser = await authService.me(userId);

    if (currentUser) {
      res.status(200).json(currentUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error fetching current user: " + error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};
