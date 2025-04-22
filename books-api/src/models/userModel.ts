import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  emailConfirmed: boolean;
  name: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    emailConfirmed: { type: Boolean, default: false },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
 export default mongoose.model<IUser>("User", UserSchema);