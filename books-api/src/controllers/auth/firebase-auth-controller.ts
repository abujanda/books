import { Request, Response } from "express";
import * as authService from "../../services/auth/firebase-service";

export const signIn = async (req: Request, res: Response) => {
  try {
    const options = req.body;
    const user = await authService.signIn(options);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Unauthorized." });
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
