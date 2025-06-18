import { Request, Response } from "express";
import * as bookService from "../services/book-service";

export const createBook = async (req: Request, res: Response) => {
  try {
    const bookData = req.body;
    const newBook = await bookService.createBook(bookData);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Error creating book" });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id; // Assuming book ID is passed in the URL
    const deletedBook = await bookService.deleteBook(bookId);
    if (deletedBook) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting book" });
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await bookService.getBook(bookId);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    // Return 404 if the book is not found
    // This is a more user-friendly error message
    // in case the book ID is invalid or not found in the database
    res.status(404).json({ message: "Book not found" });
    //res.status(500).json({ message: "Error fetching book" });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query; // Assuming user ID is passed in the URL

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
    }

    const books = await bookService.getBooks(userId as string);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
};

export const searchBooks = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== "string" || !q.trim()) {
      res.status(200).json([]);
    }

    const books = await bookService.searchBooks(String(q).trim());

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error searching books" });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const bookData = req.body;
    const updatedBook = await bookService.updateBook(bookId, bookData);
    if (updatedBook) {
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating book" });
  }
};
