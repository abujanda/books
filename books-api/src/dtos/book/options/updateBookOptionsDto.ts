import { IBookDto } from "../bookDto";

interface IUpdateBookOptionsDto extends Omit<IBookDto, "id"> {}

export type UpdateBookOptionsDto = IUpdateBookOptionsDto;