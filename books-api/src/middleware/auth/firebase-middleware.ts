import { Request, Response, NextFunction } from "express";
import { authenticateToken } from "../../utils/firebase";

export const authMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    try {
        const decoded = authenticateToken(token as string);
        (req as any).user = decoded; // Attach the decoded object to the request)
        next();
    } catch {
        res.status(401).json({ message: "Unauthorized" });
    }
}