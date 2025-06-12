import firebaseAuthRoutes from "./firebase-auth-routes";
import jwtAuthRoutes from "./jwt-auth-routes";
import { authConfig } from "../../config";
import { Issuer } from "../../utils/auth";

export const getAuthRoutes = () => {
  return authConfig.strategy === Issuer.Firebase
    ? firebaseAuthRoutes
    : jwtAuthRoutes;
};
