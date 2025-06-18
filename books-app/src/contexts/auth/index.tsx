import {
  AuthConsumer as FirebaseAuthConsumer,
  AuthContext as FirebaseAuthContext,
  AuthProvider as FirebaseAuthProvider,
} from "./firebase-context";
import {
  AuthConsumer as JwtAuthConsumer,
  AuthContext as JWTAuthContext,
  AuthProvider as JWTAuthProvider,
} from "./jwt-context";
import { authConfig } from "@/config";
import { Issuer } from "@/utils/auth";

const { strategy } = authConfig;

const AuthIssuers = {
  [Issuer.Jwt]: {
    AuthConsumer: JwtAuthConsumer,
    AuthContext: JWTAuthContext,
    AuthProvider: JWTAuthProvider,
  },
  [Issuer.Firebase]: {
    AuthConsumer: FirebaseAuthConsumer,
    AuthContext: FirebaseAuthContext,
    AuthProvider: FirebaseAuthProvider,
  },
};

export const { AuthConsumer, AuthContext, AuthProvider } =
  AuthIssuers[strategy as Issuer];
