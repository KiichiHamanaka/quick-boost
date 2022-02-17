import React, { useEffect, useState } from "react";
import ThreadCard from "../../components/ThreadCard";
import { useThreads } from "../../hooks/swrHooks";
import { findMobileSuitFromMSID } from "../../types/MobileSuit";
import { nonNullable } from "../../types/util";

import useSelectMSBox from "../../hooks/useSelectMSBox";
import MSDialog from "../../components/thread/MSSearchDialog";

import DateSearchDialog from "../../components/thread/DateSearchDialog";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import InputBox from "../../components/InputBox";

const gameMode: Array<string> = [
  "ALL",
  "ランクマッチ",
  "カジュアル",
  "クロブフェス",
];

const position: Array<string> = ["どちらでも", "前衛", "後衛"];

const ThreadIndex: React.FC = () => {
  const {
    threads,
    isLoadingThreads,
    isErrorThreads,
    threadState,
    threadDispatch,
  } = useThreads();

  const [isShowDateSearchDialog, setIsShowDateSearchDialog] =
    useState<boolean>(false);
  const [isShowMSBOX, setIsShowMSBOX] = useState<boolean>(false);
  const { mobileSuits, useMS, dispatch } = useSelectMSBox();

  useEffect(() => {
    threadDispatch({ type: "fetch", threads: threads });
  }, [threads]);

  useEffect(() => {
    threadDispatch({ type: "filterMS", msids: useMS });
  }, [useMS]);

  if (isErrorThreads) return <div>なんかおかしいわ</div>;

  if (isLoadingThreads) {
    return <div>ロードなう アニメにせんかい</div>;
  } else {
    return (
      <Grid>
        <MSDialog
          msDispatch={dispatch}
          threadDispatch={threadDispatch}
          setOpen={setIsShowMSBOX}
          open={isShowMSBOX}
        />
        <DateSearchDialog
          threadState={threadState}
          threadDispatch={threadDispatch}
          setOpen={setIsShowDateSearchDialog}
          open={isShowDateSearchDialog}
        />
        <Grid container spacing={2}>
          <Grid item>
            <InputBox labelName={"ゲームモード"} menuItem={gameMode} />
          </Grid>
          <Grid item>
            <InputBox labelName={"立ち回り"} menuItem={position} />
          </Grid>
          <Grid item>
            <Button onClick={() => setIsShowMSBOX(true)}>MS検索</Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setIsShowDateSearchDialog(true)}>
              日付検索
            </Button>
          </Grid>
        </Grid>
        <div>
          {threadState.threads.length
            ? threadState.threads.map((thread, idx) => {
                return (
                  <ThreadCard
                    key={idx}
                    ThreadId={thread._id}
                    useMS={
                      thread.useMS.length
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
      </Grid>
    );
  }
};

export default ThreadIndex;
