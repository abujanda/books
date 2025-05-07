import express from "express";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../controllers/bookController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, getBooks);
router.post("/create", authMiddleware, createBook);
router.get("/:id", authMiddleware, getBook); // Assuming you want to get a book by ID
router.delete("/:id", authMiddleware, deleteBook);
router.put("/:id", authMiddleware, updateBook); // Assuming you want to update a book by ID

export default router;
