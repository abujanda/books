import mongoose, { Schema, Document } from "mongoose";
import type { UserDto } from "../dtos/auth/userDto";
import { generateAccessToken } from "../utils/jwt";

export interface IUser extends Document {
  email: string;
  emailConfirmed: boolean;
  name: string;
  password: string;

  toDataTransferObject(): UserDto;
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

UserSchema.methods.toDataTransferObject = function (): UserDto {
  return {
    accessToken: generateAccessToken(this._id),
    email: this.email,
    emailConfirmed: this.emailConfirmed,
    name: this.name,
  } as UserDto;
};

export default mongoose.model<IUser>("User", UserSchema);
