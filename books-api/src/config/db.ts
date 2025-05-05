import mongoose from "mongoose";
import { dbConfig } from "../config";

const connectDB = async () => {
  try {
    if (!dbConfig.mongo_uri) {
      throw new Error("Add Mongo URI to .env");
    }

    await mongoose.connect(dbConfig.mongo_uri || "", { dbName: "db-book-notes"});
    console.log("MongoDB connected successfully to", dbConfig.mongo_uri);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
