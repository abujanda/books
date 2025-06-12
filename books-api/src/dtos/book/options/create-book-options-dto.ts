import { IBookDto } from "../book-dto";

interface ICreateBookOptionsDto extends Omit<IBookDto, "id"> {}

export type CreateBookOptionsDto = ICreateBookOptionsDto;