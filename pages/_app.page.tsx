import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "dh-marvel/styles/material-theme";

function MyApp({ Component, pageProps }: AppProps) {
  const LayoutComponent = (Component as any).Layout ;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
      <style jsx global>{`
        /* Other global styles such as 'html, body' etc... */

        #__next {
          height: 100%;
        }
      `}</style>
    </ThemeProvider>
  );
}

export default MyApp;
