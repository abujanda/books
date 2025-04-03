import express from "express";
import { createBook, deleteBook, getBook, getBooks, updateBook } from "../controllers/bookController";

const router = express.Router();

router.get("/", getBooks);
router.post("/", createBook);
router.get("/:id", getBook); // Assuming you want to get a book by ID
router.delete("/:id", deleteBook);
router.put("/:id", updateBook); // Assuming you want to update a book by ID

export default router;
