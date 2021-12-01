import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import Header from "../components/Header";
import emotionNormalize from "emotion-normalize";
import { Global, css } from "@emotion/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
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
    </Provider>
  );
}

export default MyApp;
