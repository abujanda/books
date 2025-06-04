import express from "express";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  searchBooks,
  updateBook,
} from "../controllers/book-controller";
import { authMiddleWare } from "../middleware/auth/firebase-auth-middleware";
import { authMiddleware as jwtMiddleware } from "../middleware/auth/jwt-auth-middleware";

const router = express.Router();

router.get("/", jwtMiddleware, getBooks); // Get all books
router.get("/search", jwtMiddleware, searchBooks); // Search books
router.post("/create", jwtMiddleware, createBook); // Create a new book
router.get("/:id", jwtMiddleware, getBook); // Get a book by ID
router.delete("/:id", jwtMiddleware, deleteBook); // Delete a book by ID
router.put("/:id", jwtMiddleware, updateBook); // Update a book by ID

export default router;
