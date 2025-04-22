import type { SignInOptions, SignUpOptions } from "@/types/auth";
import type { User } from "@/types/user";
import { requests } from "@/utils/axios";

class AuthApi {
  me(): Promise<User> {
    return requests.get("/auth"); //TODO: Add this endpoint to the backend
  }

  signIn(options: SignInOptions): Promise<User> {
    return requests.post("/auth/signin", options, undefined, true);
  }

  signUp(options: SignUpOptions): Promise<User> {
    return requests.post("/auth/signup", options);
  }
}

export const authApi = new AuthApi();
