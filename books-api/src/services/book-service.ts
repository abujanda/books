import Book from "../models/book-model";
import Tag from "../models/tag-model";
import { BookDto } from "../dtos/book/book-dto";
import { CreateBookOptionsDto } from "../dtos/book/options/create-book-options-dto";
import { UpdateBookOptionsDto } from "../dtos/book/options/update-book-options-dto";
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

export const searchBooks = async (
  query: string
): Promise<BookDto[] | null> => {
  try {
    // 1. Find matching tags by slug or name (case-insensitive)
    const matchingTags = await Tag.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { slug: { $regex: query, $options: "i" } },
      ],
    });

    const tagIds = matchingTags.map((tag) => tag._id);

    // 2. Find books by title or matching tag (case-insensitive)
    const books = await Book.find({
      $or: [
      { title: { $regex: query, $options: "i" } },
      { isbn: { $regex: query, $options: "i" } },
      { tags: { $in: tagIds } },
      ],
    }).populate("tags");

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
