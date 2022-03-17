import { Typography } from "@mui/material";
import Head from "next/head";
import React from "react";

const Custom404 = () => {
  return (
    <div>
      <Head>
        <title>存在しないページンゴねぇ</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Typography variant={"h1"}>404 - Page Not Found</Typography>
      <Typography variant={"h4"}>
        該当するページは存在しません。URLが間違っていないか確認してください。
      </Typography>
    </div>
  );
};

export default Custom404;
