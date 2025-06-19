import dotenv from "dotenv";

dotenv.config();

export const isProduction = process.env.NODE_ENV === "production";

export const authConfig = {
  firebase: {
    credentials: process.env.FIREBASE_CREDENTIALS || ""
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
