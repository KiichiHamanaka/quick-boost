import Link from "next/link";
import Image from "next/image";
import { Thread } from "../types/thread/Thread";
import { findMobileSuitFromMSID, MSImagePath } from "../types/MobileSuit";
import React from "react";
import { Box, Paper, Typography } from "@mui/material";

type ThreadProps = {
  thread: Thread;
};

const ThreadCard = (props: ThreadProps) => {
  // const bgColor = props.thread.playStyle === "ガチ" ? "#FFCCCC" : "#CCFFFF";

  return (
    <Link href={`/thread/${props.thread._id}`} passHref>
      <Paper sx={{ minWidth: "sx", maxWidth: "500px", border: 0.5 }}>
        <Box>
          <Typography>{props.thread.title}</Typography>
          {props.thread.isPlaying ? (
            <Typography>現在プレイ中！</Typography>
          ) : (
            <Typography>現在募集中！</Typography>
          )}
          <div>モード：{props.thread.gameMode}</div>
          <Box>
            {!!props.thread.useMS ? (
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
              <Typography>Nothing</Typography>
            )}
          </Box>
          {props.thread.isVC ? (
            <Image
              src={"/assets/Image/Logo/discord.jpeg"}
              alt={"VC可能"}
              width={50}
              height={50}
            />
          ) : (
            <Image
              src={"/assets/Image/Logo/discord.jpeg"}
              alt={"VC不可"}
              width={50}
              height={50}
            />
          )}
          <Typography>開始日時:{props.thread.startedAt}</Typography>
          <Typography>終了日時:{props.thread.finishedAt}</Typography>
        </Box>
      </Paper>
    </Link>
  );
};

export default ThreadCard;
