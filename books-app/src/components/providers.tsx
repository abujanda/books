'use client';

import { ReactNode } from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AuthProvider, AuthConsumer } from "@/contexts/jwt-context"
import { Toaster } from '@/components/toaster';

interface ProvidersProps {
  children: ReactNode;
}

const theme = createTheme();

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AuthProvider>
        <AuthConsumer>    
          {(auth) => {
            if (!auth.isInitialized) {
              return <div>Loading...</div>;
            }

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
