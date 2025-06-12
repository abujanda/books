import { JwtPayload, sign, verify } from "jsonwebtoken";
import { authConfig } from "../config";

export const JWT_EXPIRES_IN = 24 * 3600; // 1 day

const { secret: JWT_SECRET } = authConfig.jwt;

export const authenticateToken = (token: string): string | JwtPayload => {
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decodedToken = verify(token, JWT_SECRET) as JwtPayload;
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const generateAccessToken = (
  userId: string,
  staySignedIn?: boolean
): string => {
  const numOfDays = staySignedIn ? 7 : 1;

  return sign({ userId, iat: Math.floor(Date.now() / 1000) }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN * numOfDays,
  });
};
