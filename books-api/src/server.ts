import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import bookRoutes from "./routes/bookRoutes";
import tagRoutes from "./routes/tagRoutes";
import seedTags from "./seeds/tags";

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB().then(() => {
  seedTags();
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/tags", tagRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
