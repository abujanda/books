import { IBookDto } from "../bookDto";

interface IUpdateBookOptionsDto extends Omit<IBookDto, "id" | "userId"> {}

export type UpdateBookOptionsDto = IUpdateBookOptionsDto;