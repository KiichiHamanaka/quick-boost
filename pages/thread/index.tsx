import React, { useState } from "react";
import ThreadCard from "../../components/ThreadCard";
import { useThreads } from "../../hooks/swrHooks";
import { findMobileSuitFromMSID } from "../../types/MobileSuit";
import { nonNullable } from "../../types/util";
import useSelectMSBox from "../../hooks/useSelectMSBox";
import MSDialog from "../../components/dialog/MSSearchDialog";
import DateSearchDialog from "../../components/dialog/DateSearchDialog";
import { Button, Grid, SelectChangeEvent } from "@mui/material";
import InputBox from "../../components/InputBox";
import ShowMSImage from "../../components/selectMS/showMSImager";
import {
  GameMode,
  OpenSNSSettings,
  PlayStyle,
  Position,
  ThreadStyle,
} from "../../types/Union";
import {
  applyThreadID,
  newThreadID,
  Thread,
  ThreadID,
} from "../../types/thread/Thread";
import {
  applyUserID,
  DiscordID,
  newUserID,
  User,
  UserBio,
  UserID,
} from "../../types/User";
import { createThread, createUser } from "../api/create";
import mongoose from "mongoose";

const gameMode: Array<string> = [
  "ALL",
  "ランクマッチ",
  "カジュアル",
  "クロブフェス",
];
const playStyle: Array<string> = ["ガチ", "エンジョイ"];
const position: Array<string> = ["どちらでも", "前衛", "後衛"];

const ThreadIndex: React.FC = () => {
  const {
    threads,
    isLoadingThreads,
    isErrorThreads,
    threadState,
    threadDispatch,
  } = useThreads();
  const { useMS } = useSelectMSBox();

  console.log(threads);

  const [isShowDateSearchDialog, setIsShowDateSearchDialog] =
    useState<boolean>(false);
  const [isShowMSBOX, setIsShowMSBOX] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    threadDispatch({
      type: "gameMode",
      gameMode: event.target.value as GameMode,
    });
  };

  const makeThread = () => {
    createThread({
      _id: newThreadID(),
      threadAuthor: newUserID(),
      title: "あくしろ",
      body: "ちんぽちんぽちんぽ",
      playStyle: "ガチ",
      threadStyle: "相方募集",
      isVC: true,
      isPlaying: false,
      allowUsers: [],
      useMS: [
        Math.floor(Math.random() * 30),
        Math.floor(Math.random() * 30),
        Math.floor(Math.random() * 30),
      ],
      position: "どちらでも",
      gameMode: "何でも",
      tagCode: "21212121",
      startedAt: new Date(),
      finishedAt: new Date(),
    });
  };
  const makeUser = () => {
    createUser({
      _id: newUserID(),
      discordId: "aaaa",
      favoriteMS: [],
      openSNSSettings: "Open",
      twitterId: "aaa",
      twitterName: "aaaa",
      updatedAt: "",
    });
  };

  if (isErrorThreads) return <div>なんかおかしいわ</div>;
  if (isLoadingThreads) {
    return <div>ロードなう アニメにせんかい</div>;
  } else {
    return (
      <Grid>
        <MSDialog setOpen={setIsShowMSBOX} open={isShowMSBOX} />
        <DateSearchDialog
          setOpen={setIsShowDateSearchDialog}
          open={isShowDateSearchDialog}
        />
        <Grid container spacing={2}>
          <Grid item>
            <InputBox
              labelName={"ゲームモード"}
              menuItem={gameMode}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item>
            <InputBox labelName={"立ち回り"} menuItem={position} />
          </Grid>
          <Grid item>
            <InputBox labelName={"プレイスタイル"} menuItem={playStyle} />
          </Grid>
          <Grid item>
            <Button onClick={() => setIsShowMSBOX(true)}>MS検索</Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setIsShowDateSearchDialog(true)}>
              日付検索
            </Button>
          </Grid>
          <Button onClick={() => makeThread()}>スレ立て</Button>
          <Button onClick={() => makeUser()}>ユーザー作成</Button>
        </Grid>
        <ShowMSImage
          MobileSuits={useMS.map((ms) => findMobileSuitFromMSID(ms))}
        />
        <div>
          {threads.length
            ? threads.map((thread, idx) => {
                return <ThreadCard key={idx} thread={thread} />;
              })
            : "なんもない"}
        </div>
      </Grid>
    );
  }
};

export default ThreadIndex;
