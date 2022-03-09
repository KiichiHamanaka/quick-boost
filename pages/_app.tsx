import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Header from "../components/Header/Header";
import emotionNormalize from "emotion-normalize";
import { Global, css } from "@emotion/react";
import MsBoxContextProvider from "../contexts/msBoxContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <MsBoxContextProvider>
        <Global
          styles={css`
            ${emotionNormalize}
            html,
    body {
              padding: 0;
              margin: 0;
              background: white;
              min-height: 100%;
              font-family: Helvetica, Arial, sans-serif;
            }
          `}
        />
        <Header />
        <Component {...pageProps} />
      </MsBoxContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
