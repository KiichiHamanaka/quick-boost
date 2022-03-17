import Introduction from "../components/Introduction";
import Head from "next/head";
import React from "react";

const HowTo = () => {
  return (
    <div>
      <Head>
        <title>QuickBoostとは</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Introduction />;
    </div>
  );
};

export default HowTo;
