import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  isbn: string;
  notes?: string;
  readDate?: Date;
  summary: string;
  title: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const bookSchema: Schema = new mongoose.Schema(
  {
    isbn: { type: String, required: true, unique: true },
    notes: { type: String },
    readDate: { type: Date, default: null },
    summary: { type: String, required: true },
    title: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBook>("Book", bookSchema);
