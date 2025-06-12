import mongoose, { Schema, Document } from "mongoose";
import { authConfig } from "../config";
import type { UserDto } from "../dtos/auth/user-dto";
import { Issuer } from "../utils/auth";
import { generateAccessToken } from "../utils/jwt";

type ToDataTransferObjectOptions = {
  accessToken?: string;
  staySignedIn?: boolean;
};

export interface IUser extends Document {
  email: string;
  emailConfirmed: boolean;
  firebaseUid?: string; // (Optional) For Firebase authentication
  name: string;
  password: string;

  toDataTransferObject(options?: ToDataTransferObjectOptions): UserDto;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    emailConfirmed: { type: Boolean, default: false },
    firebaseUid: { type: String, unique: true, sparse: true }, // For Firebase authentication
    name: { type: String, required: true },
    password: {
      type: String,
      required: function () {
        return authConfig.strategy === Issuer.Jwt; // Password is required only for JWT strategy
      },
    },
  },
  { timestamps: true }
);

UserSchema.methods.toDataTransferObject = function (
  options?: ToDataTransferObjectOptions
): UserDto {
  const { accessToken, staySignedIn } = options || {};
  return {
    id: this._id,
    accessToken: accessToken || generateAccessToken(this._id, staySignedIn),
    email: this.email,
    emailConfirmed: this.emailConfirmed,
    name: this.name,
  } as UserDto;
};

export default mongoose.model<IUser>("User", UserSchema);
