import type { SignInOptions, SignUpOptions } from "@/types/auth";
import type { User } from "@/types/user";
import { requests } from "@/utils/axios";

class JwtAuthApi {
  me(): Promise<User> {
    return requests.get("/auth/me");
  }

  signIn(options: SignInOptions): Promise<User> {
    return requests.post("/auth/signin", options);
  }

  signUp(options: SignUpOptions): Promise<User> {
    return requests.post("/auth/signup", options);
  }
}

export const authApi = new JwtAuthApi();
