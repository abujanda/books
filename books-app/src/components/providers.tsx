"use client";

import { ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AuthProvider, AuthConsumer } from "@/contexts/auth/jwt-context";
import { Toaster } from "@/components/toaster";
import { createTheme } from "@/theme";
import { LoadingBackdrop } from "./loading-backdrop";
import "react-quill-new/dist/quill.snow.css";

const DEFAULT_COLOR_PRESET = "indigo";
const DEFAULT_CONTRAST = "high";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AuthProvider>
        <AuthConsumer>
          {(auth) => {
            //const showLoading = !auth.isInitialized;

            const theme = createTheme({
              colorPreset: DEFAULT_COLOR_PRESET,
              contrast: DEFAULT_CONTRAST,
            });

            return (
              <ThemeProvider theme={theme}>
                <CssBaseline />
                {/* {showLoading ? <LoadingBackdrop /> : children} */}
                {children}
                <Toaster />
              </ThemeProvider>
            );
          }}
        </AuthConsumer>
      </AuthProvider>
    </LocalizationProvider>
  );
};
