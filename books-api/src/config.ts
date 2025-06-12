import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const authConfig = {
  firebase: {
    apiKey: process.env.FIREBASE_PRIVATE_KEY || "",
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "",
    projectId: process.env.FIREBASE_PROJECT_ID || "",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "",
  },
  strategy: process.env.AUTH_STRATEGY || "jwt", // 'firebase' or 'jwt'
};

export const dbConfig = {
  mongo_uri: isProduction
    ? process.env.DB_MONGO_URI_PROD
    : process.env.DB_MONGO_URI_DEV,
};
