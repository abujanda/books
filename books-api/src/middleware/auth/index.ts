import { Request, Response, NextFunction } from "express";
import { authMiddleWare as firebaseAuthMiddleware } from "./firebase-middleware";
import { authMiddleware as jwtAuthMiddleware } from "./jwt-middleware";
import { authConfig } from "../../config";
import { Issuer } from "../../utils/auth";

// This file exports a function that returns the appropriate authentication middleware based on the configuration.
type AuthMiddleware = (req: Request, res: Response, next: NextFunction) => void;

export const getAuthMiddleware = (): AuthMiddleware => {
  return authConfig.strategy === Issuer.Firebase
    ? firebaseAuthMiddleware
    : jwtAuthMiddleware;
};
