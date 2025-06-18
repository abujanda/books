export interface IBookDto {
  id: string;
  isbn: string;
  notes?: string;
  rating?: number | null;
  readDate?: Date | null;
  summary: string;
  tags?: string[];
  title: string;
  userId: string;
}

export type BookDto = IBookDto;