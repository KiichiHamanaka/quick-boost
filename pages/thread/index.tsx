import React, { useEffect, useReducer, useState } from "react";
import ThreadCard from "../../components/ThreadCard";
import { useThreads } from "../../hooks/swrHooks";
import { findMobileSuitFromMSID } from "../../types/MobileSuit";
import { nonNullable } from "../../types/util";
import SelectMobileSuits from "../../components/SelectMobileSuits";
import { threadInitialState, threadReducer } from "../../reducers/thread";
import { Box, Modal } from "@material-ui/core";
import { msBoxInitialState, msBoxReducer } from "../../reducers/selectMSBox";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ThreadIndex: React.FC = () => {
  const { threads, isLoadingThreads, isErrorThreads } = useThreads();

  const [threadState, threadDispatch] = useReducer(
    threadReducer,
    threadInitialState
  );
  const [msBoxState, msBoxDispatch] = useReducer(
    msBoxReducer,
    msBoxInitialState
  );
  const [isShowMSBOX, setIsShowMSBOX] = useState<boolean>(false);

  useEffect(() => {
    threadDispatch({ type: "fetch", threads: threads });
  }, [threads]);

  if (isErrorThreads) return <div>なんかおかしいわ</div>;
  if (isLoadingThreads) {
    return <div>ロードなう　アニメにせんかい</div>;
  } else {
    return (
      <div>
        <Modal
          open={isShowMSBOX}
          onClose={() => setIsShowMSBOX(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <SelectMobileSuits
              dispatch={threadDispatch}
              text={"探したいMSを選択してください"}
            />
          </Box>
        </Modal>
        <button onClick={() => setIsShowMSBOX(true)}>MSから探す</button>
        選択中MS {msBoxState.useMS}
        {threadState.threads
          ? threadState.threads.map((thread, idx) => {
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
