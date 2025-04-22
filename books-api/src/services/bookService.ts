import Book, { IBook } from "../models/bookModel";

export const createBook = async (bookData: IBook): Promise<IBook> => {
  try {
    const newBook = new Book({
      ...bookData,
    });
    await newBook.save();
    return newBook;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const deleteBook = async (bookId: string): Promise<IBook | null> => {
  try {
    const book = await Book.findByIdAndDelete(bookId);
    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
}

export const getBook = async (bookId: string): Promise<IBook | null> => {
  try {
    const book = await Book.findById(bookId);
    if (!book) { 
      throw new Error("Book not found");
    }
    return book;
  } catch(error: any) {
    console.error(error);
    throw new Error(error.message);
  }
}

export const getBooks = async (userId: string): Promise<IBook[]> => {
  try {
    const books = await Book.find({ userId: userId });
    return books;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const updateBook = async (bookId: string, bookData: IBook): Promise<IBook | null> => {
  try {
    const book = await Book.findByIdAndUpdate(bookId, { $set: bookData }, { new: true });
    if (!book) {
      throw new Error("Book not found");
    }
    return book; 
  } catch(error: any) {
    console.error(error);
    throw new Error(error.message);
  }
}