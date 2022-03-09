import React from "react";
import axios from "axios";
import { useThread } from "../../../hooks/swrHooks";
import { useRouter } from "next/router";
import { Oval } from "react-loader-spinner";

const ThreadEdit: React.FC = () => {
  const router = useRouter();
  const tid = router.query.id as string;

  const { thread, isLoadingThread, isErrorThread } = useThread(tid);

  if (isLoadingThread) return <Oval color="#00BFFF" height={80} width={80} />;
  if (isErrorThread) return <div>Error</div>;
  return <div>まだだよ</div>;
};

export default ThreadEdit;
