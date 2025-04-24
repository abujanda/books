"use client";

import { ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AuthProvider, AuthConsumer } from "@/contexts/jwt-context";
import { Toaster } from "@/components/toaster";
import { createTheme } from "@/theme";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AuthProvider>
        <AuthConsumer>
          {(auth) => {
            if (!auth.isInitialized) {
              return <div>Loading...</div>;
            }

            const theme = createTheme({
              colorPreset: "indigo",
              contrast: "high",
            });

            return (
              <ThemeProvider theme={theme}>
                <CssBaseline />
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
