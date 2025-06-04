import bcrypt from "bcrypt";
import createError from "http-errors";
import PasswordValidator from "password-validator";
import validator from "validator";
import { SignInOptionsDto } from "../../dtos/auth/options/signin-options-dto";
import { SignUpOptionsDto } from "../../dtos/auth/options/signup-options-dto";
import type { UserDto } from "../../dtos/auth/user-dto";
import User from "../../models/user-model";

const passwordSchema = new PasswordValidator();
passwordSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits() // Must have at least 1 digit
  .has()
  .not()
  .spaces(); // Should not have spaces

type MeRequestResponse = Promise<UserDto | null>;

type SignInResponse = Promise<UserDto | null>;

type SignUpResponse = Promise<UserDto>;

export const getUserProfile = async (
  userId: string
): Promise<UserDto | null> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user.toDataTransferObject(); //TODO: May want to return profile related info.
  } catch (error: any) {
    console.error(error);
    throw new Error("Error fetching user profile: " + error.message);
  }
};

export const signInUser = async (options: SignInOptionsDto): SignInResponse => {
  try {
    const existingUser = await User.findOne({ email: options.email });

    if (!existingUser) {
      return null;
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(
      options.password,
      existingUser.password
    );

    if (!isMatch) {
      return null;
    }

    return existingUser.toDataTransferObject({
      staySignedIn: options.staySignedIn,
    });
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const signUpUser = async (options: SignUpOptionsDto): SignUpResponse => {
  // Validate email format
  if (!validator.isEmail(options.email)) {
    throw createError(400, "Please provide a valid email address.");
  }

  // Check if a user with the given email already exists
  const existingUser = await User.findOne({ email: options.email });
  if (existingUser) {
    throw createError(400, "Email already exists.");
  }

  if (!passwordSchema.validate(options.password)) {
    throw createError(
      400,
      "Password does not meet the complexity requirements."
    );
  }

  try {
    const newUser = new User({
      ...options,
    });
    // Hash password for security
    const saltRounds = 10;
    newUser.password = await bcrypt.hash(newUser.password, saltRounds);

    await newUser.save();

    return newUser.toDataTransferObject();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const me = async (userId: string): MeRequestResponse => {
  try {
    if (!userId) {
      throw new Error("Invalid authorization token.");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("Invalid authorization token.");
    }

    return user.toDataTransferObject();
  } catch (error: any) {
    console.error(error);
    throw new Error("Error fetching current user: " + error.message);
  }
};
