import { IBookDto } from "../book-dto";

interface IUpdateBookOptionsDto extends Omit<IBookDto, "id" | "userId"> {}

export type UpdateBookOptionsDto = IUpdateBookOptionsDto;