import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "dh-marvel/styles/material-theme";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";

function MyApp({ Component, pageProps }: AppProps) {
  const LayoutComponent = (Component as any).Layout;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {LayoutComponent ? (
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      ) : (
        <Component {...pageProps} />
      )}
      <style jsx global>{`
        /* Other global styles such as 'html, body' etc... */

        #__next {
          height: 100%;
        }
      `}</style>
    </ThemeProvider>
  );
}

(MyApp as any).Layout = LayoutGeneral;

export default MyApp;
