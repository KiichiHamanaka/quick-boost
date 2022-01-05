import React, { useEffect, useReducer, useState } from "react";
import ThreadCard from "../../components/ThreadCard";
import { useThreads } from "../../hooks/swrHooks";
import { findMobileSuitFromMSID } from "../../types/MobileSuit";
import { nonNullable } from "../../types/util";
import SelectMobileSuits from "../../components/SelectMobileSuits";
import { threadInitialState, threadReducer } from "../../store/thread";

const ThreadIndex: React.FC = () => {
  const { threads, isLoadingThreads, isErrorThreads } = useThreads();

  const [state, dispatch] = useReducer(threadReducer, threadInitialState);
  const [isShowMSBOX, setIsShowMSBOX] = useState<boolean>(false);

  useEffect(() => {
    dispatch({ type: "fetch", threads: threads });
  }, [threads]);

  if (isErrorThreads) return <div>なんかおかしいわ</div>;
  if (isLoadingThreads) {
    return <div>ロードなう　アニメにせんかい</div>;
  } else {
    return (
      <div>
        {isShowMSBOX && <SelectMobileSuits dispatch={dispatch} />}
        <button onClick={() => setIsShowMSBOX(!isShowMSBOX)}>MSから探す</button>
        {state.threads
          ? state.threads.map((thread, idx) => {
              return (
                <ThreadCard
                  key={idx}
                  ThreadId={thread._id}
                  useMS={
                    thread.useMS
                      ? thread.useMS
                          .map((msid) => findMobileSuitFromMSID(msid))
                          .filter(nonNullable)
                      : []
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
            })
          : "なんもない"}
      </div>
    );
  }
};

export default ThreadIndex;
