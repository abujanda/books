import Book from "../models/bookModel";
import Tag from "../models/tagModel";
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

    const tagSlugs = options.tags || [];
    const tags = await Tag.find({ slug: { $in: tagSlugs } });
    const tagIds = tags.map((tag) => tag._id);

    const newBook = new Book({
      ...options,
      notes: {
        html: html,
        plain: text,
      },
      tags: tagIds,
    });

    await newBook.save();

    // Populate the tags field with the actual tag documents
    await newBook.populate("tags");
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
    const book = await Book.findById(bookId).populate("tags");

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

    const tagSlugs = options.tags || [];
    const tags = await Tag.find({ slug: { $in: tagSlugs } });
    const tagIds = tags.map((tag) => tag._id);

    const book = await Book.findByIdAndUpdate(
      bookId,
      {
        $set: {
          ...options,
          notes: {
            html: html,
            plain: text,
          },
          tags: tagIds,
        },
      },
      { new: true }
    );
    if (!book) {
      throw new Error("Book not found");
    }
    await book.populate("tags");
    return book.toDataTransferObject();
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};
