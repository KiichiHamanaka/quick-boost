import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Introduction from "../components/Introduction";
import Head from "next/head";
import React from "react";

const IndexPage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  if (loading) return null;
  if (session) router.push("/thread");

  return (
    <div>
      <Head>
        <title>QuickBoostへようこそ</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Introduction />
    </div>
  );
};

export default IndexPage;
