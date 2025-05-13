export interface IBookDto {
  id: string;
  isbn: string;
  notes?: string;
  rating?: number | null;
  readDate?: Date | null;
  summary: string;
  title: string;
  userId: string;
}

export type BookDto = IBookDto;