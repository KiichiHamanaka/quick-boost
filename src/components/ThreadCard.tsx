import Link from "next/link";
import Image from "next/image";
import { ThreadType } from "../types/thread/ThreadType";
import { findMobileSuitFromMSID, MSImagePath } from "../types/MobileSuit";
import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { PlayStyle } from "../types/Union";
import { blue, red, cyan } from "@mui/material/colors";

type ThreadProps = {
  thread: ThreadType;
};

const ThreadCard = (props: ThreadProps) => {
  const bgColor = (ps: PlayStyle) => {
    switch (ps) {
      case "どちらでも":
        return cyan[50];
      case "エンジョイ":
        return blue[200];
      case "ガチ":
        return red[200];
    }
  };

  return (
    <Link href={`/thread/${props.thread._id}`} passHref>
      <Paper
        sx={{
          minWidth: "sx",
          maxWidth: "500px",
          border: 0.5,
          background: `linear-gradient(${bgColor(
            props.thread.playStyle
          )}, #FFFFFF)`,
        }}
      >
        <Box>
          <Typography>{props.thread.title}</Typography>
          {/*{props.thread.isPlaying ? (*/}
          {/*  <Typography>現在プレイ中！</Typography>*/}
          {/*) : (*/}
          {/*  <Typography>現在募集中！</Typography>*/}
          {/*)}*/}
          {props.thread.position === "どちらでも" ? (
            <Typography>前衛後衛募集中！</Typography>
          ) : (
            <Typography>{props.thread.position}募集中！</Typography>
          )}
          <div>モード：{props.thread.gameMode}</div>
          <Box>
            <Typography>使用機体</Typography>
            {props.thread.useMS.length > 3 ? (
              <>
                {props.thread.useMS
                  .filter((ms, idx) => idx < 3)
                  .map((ms, idx) => (
                    <Image
                      key={idx}
                      src={MSImagePath(findMobileSuitFromMSID(ms))}
                      alt={findMobileSuitFromMSID(ms).name}
                      loading={"lazy"}
                      width={106}
                      height={52}
                    />
                  ))}
                +many!
              </>
            ) : props.thread.useMS.length ? (
              props.thread.useMS.map((ms, idx) => (
                <Image
                  key={idx}
                  src={MSImagePath(findMobileSuitFromMSID(ms))}
                  alt={findMobileSuitFromMSID(ms).name}
                  loading={"lazy"}
                  width={106}
                  height={52}
                />
              ))
            ) : (
              <Typography>合わせます</Typography>
            )}
          </Box>
          {/*{props.thread.isVC ? (*/}
          {/*  <Image*/}
          {/*    src={"/assets/Image/Logo/discord.jpeg"}*/}
          {/*    alt={"VC可能"}*/}
          {/*    width={50}*/}
          {/*    height={50}*/}
          {/*  />*/}
          {/*) : (*/}
          {/*  <Image*/}
          {/*    src={"/assets/Image/Logo/discord.jpeg"}*/}
          {/*    alt={"VC不可"}*/}
          {/*    width={50}*/}
          {/*    height={50}*/}
          {/*  />*/}
          {/*)}*/}
          <Typography>開始日時:{props.thread.startedAt}</Typography>
          <Typography>終了日時:{props.thread.finishedAt}</Typography>
        </Box>
      </Paper>
    </Link>
  );
};

export default ThreadCard;