import admin from "../libs/firebase";

export const authenticateToken = async (token: string) => {
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid token");
  }
}