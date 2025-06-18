interface IBook {
  id: string;
  isbn: string;
  notes?: string;
  rating?: number;
  readDate: Date;
  summary?: string;
  tags?: string[];
  title: string;
  userId: string;
}

interface ICreateBookOptions extends Omit<IBook, "id"> {}

interface IUpdateBookOptions extends Omit<IBook, "id" | "userId"> {}

export type Book = IBook;

export type CreateBookOptions = ICreateBookOptions;

export type UpdateBookOptions = IUpdateBookOptions;