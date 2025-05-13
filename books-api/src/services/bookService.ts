import Book from "../models/bookModel";
import { BookDto } from "../dtos/book/bookDto";
import { CreateBookOptionsDto } from "../dtos/book/options/createBookOptionsDto";
import { UpdateBookOptionsDto } from "../dtos/book/options/updateBookOptionsDto";
import { convertHtmlToText } from "../utils/html-to-text";
import { sanitizeHTML } from "../utils/sanitize-html";

const processNotes = (htmlNotes?: string): { html: string; text: string } => {
  const sanitizedHtml = sanitizeHTML(htmlNotes || "");
  return {
    html: sanitizedHtml,
    text: convertHtmlToText(sanitizedHtml),
  };
};

export const createBook = async (
  options: CreateBookOptionsDto
): Promise<BookDto> => {
  try {
    const { html, text } = processNotes(options.notes);

    const newBook = new Book({
      ...options,
      notes: {
        html: html,
        plain: text,
      },
    });

    await newBook.save();
    return newBook.toDataTransferObject();
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const deleteBook = async (bookId: string): Promise<BookDto | null> => {
  try {
    const book = await Book.findByIdAndDelete(bookId);
    if (!book) {
      throw new Error("Book not found");
    }
    return book.toDataTransferObject();
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const getBook = async (bookId: string): Promise<BookDto | null> => {
  try {
    const book = await Book.findById(bookId);

    if (!book) {
      throw new Error("Book not found");
    }

    return book.toDataTransferObject();
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const getBooks = async (userId: string): Promise<BookDto[]> => {
  try {
    const books = await Book.find({ userId: userId });

    if (!books) {
      throw new Error("Books not found");
    }

    return books.map((book) => ({
      ...book.toDataTransferObject(),
    }));
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const updateBook = async (
  bookId: string,
  options: UpdateBookOptionsDto
): Promise<BookDto | null> => {
  try {
    const { html, text } = processNotes(options.notes);

    const book = await Book.findByIdAndUpdate(
      bookId,
      {
        $set: {
          ...options,
          notes: {
            html: html,
            plain: text,
          },
        },
      },
      { new: true }
    );
    if (!book) {
      throw new Error("Book not found");
    }
    return book.toDataTransferObject();
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};
