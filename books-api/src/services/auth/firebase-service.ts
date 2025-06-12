import { authenticateToken } from "../../utils/firebase";
import type { UserDto } from "../../dtos/auth/user-dto";
import User from "../../models/user-model";

type SignInRequest = {
  idToken: string;
};

type SignInResponse = Promise<UserDto | null>;

export const signIn = async (request: SignInRequest): SignInResponse => {
  const { idToken } = request;

  try {
    // Verify the ID token with Firebase
    const decodedToken = await authenticateToken(idToken);

    if (!decodedToken) {
      return null;
    }

    const { uid, email, email_verified, name } = decodedToken;

    // Check if the user exists in database
    let user = await User.findOne({ firebaseUid: uid });

    // If user does not exist, create a new user
    if (!user) {
      // Get everything before the '@' in the email
      const username = email ? email.split('@')[0] : undefined;

      user = new User({
        email,
        emailConfirmed: email_verified,
        firebaseUid: uid,
        name: name || username || email,
        password: "", // Password is not used for Firebase auth, but required by User model
      });
      await user.save();
    }

    return user.toDataTransferObject({ accessToken: idToken });
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};
