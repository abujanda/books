import mongoose, { Schema, Document } from "mongoose";

export interface ITag extends Document {
  name: { type: String; required: true; unique: true };
  slug: { type: String; required: true; unique: true };
}

const tagSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITag>("Tag", tagSchema);