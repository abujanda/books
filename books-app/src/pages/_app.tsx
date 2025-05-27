import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider as ReduxProvider } from "react-redux";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LoadingBackdrop } from "@/components/loading-backdrop";
import { SplashScreen } from "@/components/splash-screen";
import { Toaster } from "../components/toaster";
import { AuthConsumer, AuthProvider } from "../contexts/jwt-context";
import { store } from "../store";
import { createTheme } from "../theme";
import { createEmotionCache } from "../utils/create-emotion-cache";
import "react-quill-new/dist/quill.snow.css";

const DEFAULT_COLOR_PRESET = "indigo";
const DEFAULT_CONTRAST = "high";

const clientSideEmotionCache = createEmotionCache();

const App = (props: AppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Book Notes App</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthProvider>
            <AuthConsumer>
              {(auth) => {
                const showLoading = !auth.isInitialized;

                const theme = createTheme({
                  colorPreset: DEFAULT_COLOR_PRESET,
                  contrast: DEFAULT_CONTRAST,
                });

                return (
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {showLoading ? (
                      <LoadingBackdrop />
                    ) : (
                      getLayout(<Component {...pageProps} />)
                    )}
                    <Toaster />
                  </ThemeProvider>
                );
              }}
            </AuthConsumer>
          </AuthProvider>
        </LocalizationProvider>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default App;
