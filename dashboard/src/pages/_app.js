import { useEffect } from "react";
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { theme } from "../theme";
import "../styles/globals.css";
import "rsuite/dist/rsuite.min.css";
import AuthProvider from "src/contextx/authContext";
import TeamAndUserProvider from "src/contextx/teamAndUserContext";
import { isJwtExpired } from "jwt-check-expiration";
import { useRouter } from "next/router";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
    if (token && !isJwtExpired(token)) {
      router.replace("/dashboard");
    } else {
      router.replace("/signin");
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Material Kit Pro</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
        <TeamAndUserProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </LocalizationProvider>
        </TeamAndUserProvider>
      </AuthProvider>
    </CacheProvider>
  );
};

export default App;
