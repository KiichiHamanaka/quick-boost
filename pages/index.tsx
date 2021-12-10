import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Introduction from "../components/Introduction";

const IndexPage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  if (loading) return null;
  if (session) router.push("/find");

  return <Introduction />;
};

export default IndexPage;
