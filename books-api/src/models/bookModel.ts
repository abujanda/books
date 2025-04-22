import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  isbn: string;
  notes?: string;
  rating?: number;
  readDate?: Date;
  summary: string;
  title: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const bookSchema: Schema = new mongoose.Schema(
  {
    isbn: { type: String, required: true, unique: true },
    notes: { type: String, default: null },
    rating: { type: Number, min: 1, max: 5, default: null },
    readDate: { type: Date, default: null },
    summary: { type: String },
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
