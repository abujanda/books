import { useContext } from "react";
import type { AuthContextType as FirebaseAuthContextType } from "@/contexts/auth/firebase-context";
import type { AuthContextType as JWTAuthContextType } from "@/contexts/auth/jwt-context";
import { AuthContext } from "@/contexts/auth";

type AuthContextType = FirebaseAuthContextType | JWTAuthContextType;

export const useAuth = <T = AuthContextType>() =>
  useContext(AuthContext as any) as T;
