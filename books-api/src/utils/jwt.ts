import { JwtPayload, sign, verify } from "jsonwebtoken";
import { jwtConfig } from "../config";

export const JWT_EXPIRES_IN = 24 * 3600; // 1 day

export const authenticateToken = (token: string): string | JwtPayload => {
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decodedToken = verify(token, jwtConfig.secret) as JwtPayload;
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const generateAccessToken = (
  userId: string,
  options?: { staySignedIn?: boolean }
): string => {
  const { staySignedIn } = options ?? {};
  const numOfDays = staySignedIn ? 7 : 1;

  return sign(
    { userId, iat: Math.floor(Date.now() / 1000) },
    jwtConfig.secret,
    {
      expiresIn: JWT_EXPIRES_IN * numOfDays,
    }
  );
};
