import { Button, Grid, SelectChangeEvent } from "@mui/material";
import InputBox from "../InputBox";
import { gameMode, playStyle, position } from "../../db/data/FormItems";
import React, { Dispatch } from "react";
import { GameMode, PlayStyle, Position } from "../../types/Union";
import { ThreadAction } from "../../reducers/thread";

type Props = {
  threadDispatch: Dispatch<ThreadAction>;
  setIsShowMSBOX: any;
  setIsShowDateSearchDialog: any;
};

const ThreadFilterInputs: React.FC<Props> = ({
  threadDispatch,
  setIsShowMSBOX,
  setIsShowDateSearchDialog,
}) => {
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

  return (
    <Grid container justifyContent={"center"} spacing={2}>
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
        <Button onClick={() => setIsShowMSBOX(true)}>使用MS検索</Button>
      </Grid>
      <Grid item>
        <Button onClick={() => setIsShowMSBOX(true)}>相方MS検索</Button>
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
  );
};

export default ThreadFilterInputs;
