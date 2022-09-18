import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "dh-marvel/styles/material-theme";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const LayoutComponent = (Component as any).Layout;
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
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
    </>
  );
}

(MyApp as any).Layout = LayoutGeneral;

export default MyApp;
