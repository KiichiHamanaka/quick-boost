import React, { useEffect, useState } from "react";
import ThreadCard from "../../components/ThreadCard";
import { useThreads } from "../../hooks/swrHooks";
import { Thread } from "../../models/Thread";
import { MobileSuit } from "../../models/MobileSuit";

type option = {
  startedAt: Date | null;
  useMS: Array<MobileSuit>;
  sort: "ASC" | "DESC";
};

const FindIndex: React.FC = () => {
  const { res, isLoading, isError } = useThreads();
  const [Threads, setThreads] = useState<Array<Thread>>(res);
  const [params, setParams] = useState<option>({
    startedAt: null,
    useMS: [],
    sort: "DESC",
  });
  // useEffect(() => {
  //   setThreads(
  //       res.filter(thread => thread.)
  //   ); //Finds をフィルタする
  // }, params);
  if (isLoading) return <div>Loading Animation</div>;
  if (isError) return <div>Error</div>;

  // const aaa = (args:string) => {
  //   setParams()
  // }

  return (
    <div>
      {Threads?.map((thread, idx) => {
        return (
          <ThreadCard
            key={idx}
            id={thread.id}
            useMS={thread.useMS}
            playStyle={thread.playStyle}
            title={thread.title}
            threadAuthor={thread.threadAuthor}
            isVC={thread.isVC}
            startedAt={"2022-12-12"}
            finishedAt={"2022-12-12"}
            isPlaying={false}
            position={"どちらでも"}
            gameMode={"ランクマッチ"}
          />
        );
      })}
    </div>
  );
};

export default FindIndex;
