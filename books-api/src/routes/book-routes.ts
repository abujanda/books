import express from "express";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  searchBooks,
  updateBook,
} from "../controllers/book-controller";
import { getAuthMiddleware } from "../middleware/auth";

const authMiddleware = getAuthMiddleware();
const router = express.Router();

router.get("/", authMiddleware, getBooks); // Get all books
router.get("/search", authMiddleware, searchBooks); // Search books
router.post("/create", authMiddleware, createBook); // Create a new book
router.get("/:id", authMiddleware, getBook); // Get a book by ID
router.delete("/:id", authMiddleware, deleteBook); // Delete a book by ID
router.put("/:id", authMiddleware, updateBook); // Update a book by ID

export default router;
