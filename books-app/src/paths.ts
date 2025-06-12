/**
 * This file defines the paths used in the application.
 * It includes paths for authentication, books, profile, and error pages.
 * The paths are structured to allow for easy navigation and management.
 */
import { authConfig } from "./config";

type AuthPaths = {
  firebase: {
    signin: string;
    signup: string;
  };
  jwt: {
    signin: string;
    signup: string;
    verifyEmail: string;
  };
};

type Paths = {
  index: string;
  account: {
    index: string;
  };
  auth: AuthPaths;
  books: {
    index: string;
    create: string;
    edit: string;
    view: string;
  };
  profile: {
    index: string;
  };
  terms: string;
  401: string;
  404: string;
  500: string;
};

export const paths: Paths = {
  index: "/",
  account: {
    index: "/account",
  },
  auth: {
    firebase: {
      signin: "/auth/firebase/signin",
      signup: "/auth/firebase/signup",
    },
    jwt: {
      signin: "/auth/jwt/signin",
      signup: "/auth/jwt/signup",
      verifyEmail: "/auth/jwt/verify-email",
    },
  },
  books: {
    index: "/books",
    create: "/books/create",
    edit: "/books/edit/[id]",
    view: "/books/view/[id]",
  },
  profile: {
    index: "/profile",
  },
  terms: "/terms",
  401: "/401",
  404: "/404",
  500: "/500",
};

const { strategy } = authConfig;

// Export the auth paths for the current strategy
export const authPaths = paths.auth[strategy as keyof typeof paths.auth];
