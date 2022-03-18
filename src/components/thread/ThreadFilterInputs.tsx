import { Button, Grid, SelectChangeEvent } from "@mui/material";
import InputBox from "../InputBox";
import { gameMode, playStyle, position } from "../../db/data/FormItems";
import React, { Dispatch } from "react";
import { GameMode, PlayStyle, Position } from "../../types/Union";
import { ThreadAction } from "../../reducers/thread";

type Props = {
  threadDispatch: Dispatch<ThreadAction>;
  setIsShowMSBOX: any;
  setIsShowPartnerMSBOX: any;
  setIsShowDateSearchDialog: any;
};

const ButtonStyles = {
  width: "200px",
};

const ThreadFilterInputs: React.FC<Props> = ({
  threadDispatch,
  setIsShowMSBOX,
  setIsShowPartnerMSBOX,
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
    <Grid
      container
      sx={{ height: "250px" }}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={2}
    >
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", flexDirection: "column" }}
        xs={6}
        md={6}
      >
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
      </Grid>
      <Grid
        container
        sx={{
          flexDirection: "column",
          alignItems: "center",
        }}
        spacing={2}
        xs={6}
        md={6}
      >
        <Grid item>
          <Button
            sx={ButtonStyles}
            variant="contained"
            onClick={() => setIsShowMSBOX(true)}
          >
            使用MS検索
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={ButtonStyles}
            variant="contained"
            onClick={() => setIsShowPartnerMSBOX(true)}
          >
            相方MS検索
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={ButtonStyles}
            variant="contained"
            onClick={() => setIsShowDateSearchDialog(true)}
          >
            日付検索
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={ButtonStyles}
            variant="contained"
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
    </Grid>
  );
};

export default ThreadFilterInputs;
