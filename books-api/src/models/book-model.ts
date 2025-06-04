import mongoose, { Schema, Document } from "mongoose";
import { BookDto } from "../dtos/book/book-dto";
import { ITag } from "./tag-model";

export interface IBook extends Document {
  isbn: string;
  notes: {
    html: { type: string; default: null };
    plain: { type: string; default: null };
  };
  rating?: number;
  readDate?: Date;
  summary: string;
  title: string;
  userId: mongoose.Schema.Types.ObjectId;

  toDataTransferObject(): BookDto;
}

const BookSchema: Schema = new mongoose.Schema(
  {
    isbn: { type: String, required: true, unique: true },
    notes: {
      html: { type: String, default: null },
      plain: { type: String, default: null },
    },
    rating: { type: Number, min: 0, max: 5, default: null },
    readDate: { type: Date, default: null },
    summary: { type: String },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    title: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

BookSchema.methods.toDataTransferObject = function (): BookDto {
  
  const tags: string[] = this.populated("tags")
    ? this.tags.map((tag: ITag) => tag.slug)
    : [];

  return {
    id: (this._id as unknown as string).toString(),
    isbn: this.isbn,
    notes: typeof this.notes.html === "string" ? this.notes.html : "",
    rating: this.rating,
    readDate: this.readDate,
    tags: tags,
    summary: this.summary,
    title: this.title,
    userId: this.userId.toString(),
  } as BookDto;
};

export default mongoose.model<IBook>("Book", BookSchema);
