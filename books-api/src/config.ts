import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const dbConfig = {
  mongo_uri: isProduction
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV,
};

export const jwtConfig = {
  secret: process.env.JWT_SECRET || "",
};
