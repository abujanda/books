import type { User } from "@/types/user";
import { requests } from "@/utils/axios";

class FirebaseAuthApi {
  signIn(token: string): Promise<User> {
    return requests.post("/auth/signin", { idToken: token });
  }
}

export const authApi = new FirebaseAuthApi();