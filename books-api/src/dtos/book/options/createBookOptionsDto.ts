import { IBookDto } from "../bookDto";

interface ICreateBookOptionsDto extends Omit<IBookDto, "id"> {}

export type CreateBookOptionsDto = ICreateBookOptionsDto;