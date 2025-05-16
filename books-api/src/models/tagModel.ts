import mongoose, { Schema, Document } from "mongoose";
import { TagDto } from "../dtos/tag/tagDto";

export interface ITag extends Document {
  name: { type: String; required: true; unique: true };
  slug: { type: String; required: true; unique: true };

  toDataTransferObject(): TagDto;
}

const tagSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

tagSchema.methods.toDataTransferObject = function (): TagDto {
  return {
    id: (this._id as unknown as string).toString(),
    name: this.name,
    slug: this.slug,
  } as TagDto;
};

export default mongoose.model<ITag>("Tag", tagSchema);
