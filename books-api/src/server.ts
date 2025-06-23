import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectMongoDb from "./libs/mongo-db";
import { getAuthRoutes } from "./routes/auth";
import bookRoutes from "./routes/book-routes";
import pingRoutes from "./routes/ping";
import tagRoutes from "./routes/tag-routes";
import seedTags from "./seeds/tags";

dotenv.config();
const app = express();

// Connect to MongoDB
connectMongoDb().then(() => {
  seedTags();
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", getAuthRoutes());
app.use("/api/books", bookRoutes);
app.use("/api/ping", pingRoutes);
app.use("/api/tags", tagRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
