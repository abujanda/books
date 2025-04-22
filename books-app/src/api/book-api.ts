import type { Book, BookCreateOptions, BookUpdateOptions } from "@/types/book";
import {requests} from "@/utils/axios";

class BookApi {
  createBook(options: BookCreateOptions): Promise<Book> {
    return requests.post("/books/create", options);
  }

  deleteBook(id: string): Promise<void> {
    return requests.del(`/books/${id}`);
  }

  getBooks(userId: string): Promise<Book[]> {
    return requests.query('/books', { userId });
  }

  getBook(id: string): Promise<Book> {
    return requests.get(`/books/${id}`);
  }

  updateBook(id: string, options: BookUpdateOptions): Promise<Book> {
    return requests.put(`/books/${id}`, options);
  }
}

export const bookApi = new BookApi();