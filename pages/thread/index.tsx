import React, { useEffect, useState } from "react";
import ThreadCard from "../../components/ThreadCard";
import { useThreads } from "../../hooks/swrHooks";
import { findMobileSuitFromMSID } from "../../types/MobileSuit";
import useSelectMSBox from "../../hooks/useSelectMSBox";
import MSDialog from "../../components/dialog/MSSearchDialog";
import DateSearchDialog from "../../components/dialog/DateSearchDialog";
import {
  Alert,
  AlertColor,
  AlertTitle,
  Button,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import InputBox from "../../components/InputBox";
import ShowMSImage from "../../components/selectMS/showMSImager";
import { GameMode, PlayStyle, Position } from "../../types/Union";
import { GetServerSideProps } from "next";
import { ThreadType } from "../../types/thread/ThreadType";
import Thread from "../../db/models/Thread";
import connectDB from "../../db/connectDB";
import { useRouter } from "next/router";
import { Oval } from "react-loader-spinner";

const gameMode: Array<GameMode> = [
  "何でも",
  "ランクマッチ",
  "カジュアル",
  "クロブフェス",
];
const playStyle: Array<PlayStyle> = ["どちらでも", "ガチ", "エンジョイ"];
const position: Array<Position> = ["どちらでも", "前衛", "後衛"];

interface Props {
  fallbackData: ThreadType[];
}

const ThreadIndex: React.FC<Props> = ({ fallbackData }) => {
  const {
    result,
    threadState,
    isLoadingThreads,
    isErrorThreads,
    threadDispatch,
  } = useThreads(fallbackData);
  const { useMS, dispatch } = useSelectMSBox();

  const router = useRouter();
  const query = router.query;
  const [isShowDateSearchDialog, setIsShowDateSearchDialog] =
    useState<boolean>(false);
  const [isShowMSBOX, setIsShowMSBOX] = useState<boolean>(false);

  useEffect(() => {
    dispatch({ type: "useMS", useMS: "reset" });
  }, []);

  const gameModeHandleChange = (event: SelectChangeEvent) => {
    threadDispatch({
      type: "gameMode",
      gameMode: event.target.value as GameMode,
    });
  };
  const positionHandleChange = (event: SelectChangeEvent) => {
    threadDispatch({
      type: "position",
      position: event.target.value as Position,
    });
  };

  const playStyleHandleChange = (event: SelectChangeEvent) => {
    threadDispatch({
      type: "playStyle",
      playStyle: event.target.value as PlayStyle,
    });
  };

  if (isErrorThreads) return <div>なんかおかしいわ</div>;
  if (isLoadingThreads) {
    return <Oval color="#00BFFF" height={80} width={80} />;
  } else {
    return (
      <Grid>
        <MSDialog setOpen={setIsShowMSBOX} open={isShowMSBOX} />
        <DateSearchDialog
          setOpen={setIsShowDateSearchDialog}
          open={isShowDateSearchDialog}
          state={threadState}
          dispatch={threadDispatch}
        />
        {!!Object.keys(query).length && (
          <Alert severity={query.severity as AlertColor}>
            <AlertTitle>{query.alertTitle}</AlertTitle>
            {query.alertDesc}
          </Alert>
        )}
        <Grid container spacing={2}>
          <Grid item>
            <InputBox
              labelName={"プレイスタイル"}
              menuItem={playStyle}
              handleChange={playStyleHandleChange}
              dv={playStyle[0]}
            />
          </Grid>
          <Grid item>
            <InputBox
              labelName={"ゲームモード"}
              menuItem={gameMode}
              handleChange={gameModeHandleChange}
              dv={gameMode[0]}
            />
          </Grid>
          <Grid item>
            <InputBox
              labelName={"立ち回り"}
              menuItem={position}
              handleChange={positionHandleChange}
              dv={position[0]}
            />
          </Grid>
          <Grid item>
            <Button onClick={() => setIsShowMSBOX(true)}>MS検索</Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setIsShowDateSearchDialog(true)}>
              日付検索
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() =>
                threadDispatch({
                  type: "sortDesc",
                })
              }
            >
              ソート順
            </Button>
          </Grid>
        </Grid>
        <ShowMSImage
          MobileSuits={useMS.map((ms) => findMobileSuitFromMSID(ms))}
        />
        <div>
          {result.length
            ? result.map((thread, idx) => {
                return <ThreadCard key={idx} thread={thread} />;
              })
            : "検索条件に沿う募集は見つかりませんでした"}
        </div>
      </Grid>
    );
  }
};

export const getServerSideProps: GetServerSideProps = async () => {
  await connectDB();
  const threads = await Thread.find().populate("threadAuthor");
  const t = JSON.parse(JSON.stringify(threads));

  return {
    props: {
      fallbackData: t,
    },
  };
};

export default ThreadIndex;
