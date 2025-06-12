import { Request, Response, NextFunction } from "express";
import { authenticateToken } from "../../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // Bearer <token>

  try {
    const decoded = authenticateToken(token as string);
    (req as any).user = decoded; // Attach the decoded object to the request
    next(); // Call the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
