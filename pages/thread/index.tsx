import React, { useEffect, useState } from "react";
import ThreadCard from "../../components/ThreadCard";
import { useThreads } from "../../hooks/swrHooks";
import { Thread } from "../../db/models/Thread";
import { findMobileSuitFromMSID, MobileSuit } from "../../types/MobileSuit";
import { nonNullable } from "../../types/util";

type option = {
  startedAt: Date | null;
  useMS: Array<MobileSuit>;
  sort: "ASC" | "DESC";
};

const ThreadIndex: React.FC = () => {
  const { threads, isLoadingThreads, isErrorThreads } = useThreads();
  const [Threads, setThreads] = useState<Array<Thread>>();
  const [params, setParams] = useState<option>({
    startedAt: null,
    useMS: [],
    sort: "DESC",
  }); //ユーザーがフィルタしたいパラメータ

  // useEffect(() => {
  //   setThreads(
  //       threads.filter(thread => thread.)
  //   ); //Threads をフィルタする
  // }, params);
  // useEffect(() => {
  //   setThreads(
  //       res.filter(thread => thread.)
  //   ); //Threads をフィルタする
  // }, params);
  if (isLoadingThreads) return <div>Loading Animation</div>;
  if (isErrorThreads) return <div>Error</div>;

  return (
    <div>
      {threads?.map((thread, idx) => {
        return (
          <ThreadCard
            key={idx}
            ThreadId={thread._id}
            useMS={
              thread.useMS &&
              thread.useMS
                .map((msid) => msid && findMobileSuitFromMSID(msid))
                .filter(nonNullable)
            }
            playStyle={thread.playStyle}
            title={thread.title}
            threadAuthor={thread.threadAuthor}
            isVC={thread.isVC}
            startedAt={thread.startedAt}
            finishedAt={thread.finishedAt}
            isPlaying={false}
            position={thread.position}
            gameMode={thread.gameMode}
          />
        );
      })}
    </div>
  );
};

export default ThreadIndex;
