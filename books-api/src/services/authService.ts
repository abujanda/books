import bcrypt from "bcrypt";
import PasswordValidator from "password-validator";
import validator from "validator";
import User, { IUser } from "../models/userModel";

const passwordSchema = new PasswordValidator();
passwordSchema
  .is().min(8) // Minimum length 8
  .is().max(100) // Maximum length 100
  .has().uppercase() // Must have uppercase letters
  .has().lowercase() // Must have lowercase letters
  .has().digits() // Must have at least 1 digit
  .has().not().spaces(); // Should not have spaces


export const getUserProfile = async (userId: string): Promise<IUser | null> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error: any) {
    throw new Error("Error fetching user profile: " + error.message);
  }
}

export const signInUser = async (email: string, password: string): Promise<IUser | null> => {
    try{
        const existingUser = await User.findOne({email: email});

        if(!existingUser){
            throw new Error("Incorrect email address or password.");
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch){
            throw new Error("Incorrect email address or password.");
        }

        return existingUser;

    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const signUpUser = async (userData: IUser): Promise<IUser> => {
  try {
    // Validate email format
    if (!validator.isEmail(userData.email)) {
      throw new Error("Please provide a valid email address.");
    }

    // Check if a user with the given email already exists
    const existingUser = await User.findOne({email: userData.email});
    if (existingUser) {
      throw new Error("Email already exists.");
    }
    
    if(!passwordSchema.validate(userData.password)) {
        throw new Error("Password does not meet the complexity requirements.");
    }

    const newUser = new User({
      ...userData,
    });
    // Hash password for security
    const saltRounds = 10;
    newUser.password = await bcrypt.hash(newUser.password, saltRounds);

    await newUser.save();
    return newUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};