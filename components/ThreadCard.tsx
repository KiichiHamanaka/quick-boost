import Link from "next/link";
import Image from "next/image";
import { Thread } from "../types/thread/Thread";
import { findMobileSuitFromMSID, MSImagePath } from "../types/MobileSuit";
import React from "react";
import { Box, Typography } from "@mui/material";

type ThreadProps = {
  thread: Thread;
};

const ThreadCard = (props: ThreadProps) => {
  // const bgColor = props.thread.playStyle === "ガチ" ? "#FFCCCC" : "#CCFFFF";

  return (
    <Link href={`/thread/${props.thread._id?._id}`} passHref>
      <Box sx={{ minWidth: "sx", height: "100px", border: 1 }}>
        {props.thread._id?._id}
        {/*{props.thread.isPlaying ? <p>現在プレイ中！</p> : <p>現在募集中！</p>}*/}
        {/*<div>{props.thread.threadAuthor.value}</div>*/}
        {/*<div>{props.thread}</div>*/}
        {/*<div>モード：{props.thread.gameMode}</div>*/}
        {!!props.thread.useMS.length ? (
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
        {/*{props.thread.isVC ? (*/}
        {/*  <Image src={"/assets/Logo/discord.jpeg"} alt={"VC可能"} />*/}
        {/*) : (*/}
        {/*  <Image src={"/assets/cantDiscord.png"} alt={"VC不可"} />*/}
        {/*)}*/}
      </Box>
    </Link>
  );
};

export default ThreadCard;
