import { JwtPayload, sign, verify } from "jsonwebtoken";
import { jwtConfig } from "../config";

export const JWT_EXPIRES_IN = 24 * 3600; // 1 day

export const authenticateToken = (token: string): string | JwtPayload => {
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decoded = verify(token, jwtConfig.secret) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const generateAccessToken = (userId: string): string => {
  return sign(
    { userId, iat: Math.floor(Date.now() / 1000) },
    jwtConfig.secret,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
};
