import React, { useState } from "react";
import ThreadCard from "../../components/ThreadCard";
import { useThreads } from "../../hooks/swrHooks";
import { findMobileSuitFromMSID } from "../../types/MobileSuit";
import useSelectMSBox from "../../hooks/useSelectMSBox";
import MSDialog from "../../components/dialog/MSSearchDialog";
import DateSearchDialog from "../../components/dialog/DateSearchDialog";
import { Button, Grid, SelectChangeEvent } from "@mui/material";
import InputBox from "../../components/InputBox";
import ShowMSImage from "../../components/selectMS/showMSImager";
import { GameMode, PlayStyle, Position } from "../../types/Union";

const gameMode: Array<GameMode> = [
  "何でも",
  "ランクマッチ",
  "カジュアル",
  "クロブフェス",
];
const playStyle: Array<PlayStyle> = ["ガチ", "エンジョイ"];
const position: Array<Position> = ["どちらでも", "前衛", "後衛"];

const ThreadIndex = () => {
  const { result, isLoadingThreads, isErrorThreads, threadDispatch } =
    useThreads();
  const { useMS } = useSelectMSBox();

  const [isShowDateSearchDialog, setIsShowDateSearchDialog] =
    useState<boolean>(false);
  const [isShowMSBOX, setIsShowMSBOX] = useState<boolean>(false);

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

export default ThreadIndex;
