import { initializeApp } from "firebase/app";
import { authConfig } from "@/config";

const { firebase: firebaseConfig } = authConfig;

export const firebaseApp = initializeApp(firebaseConfig);
