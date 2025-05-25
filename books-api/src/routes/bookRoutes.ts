import express from "express";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  searchBooks,
  updateBook,
} from "../controllers/bookController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// router.get("/", authMiddleware, getBooks); // Get all books
// router.post("/create", authMiddleware, createBook); // Create a new book
// router.get("/:id", authMiddleware, getBook); // Get a book by ID
// router.delete("/:id", authMiddleware, deleteBook); // Delete a book by ID
// router.put("/:id", authMiddleware, updateBook); // Update a book by ID

router.get("/", getBooks);
router.get("/search", searchBooks); // Assuming you want to search books
router.post("/create", createBook);
router.get("/:id", getBook); // Assuming you want to get a book by ID
router.delete("/:id", deleteBook);
router.put("/:id", updateBook); // Assuming you want to update a book by ID

export default router;
