import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useComments, useThread, useUser } from "../../hooks/swrHooks";
import { findMobileSuitFromMSID, MSImagePath } from "../../types/MobileSuit";
import { applyThreadID } from "../../types/thread/Thread";
import { Box, Typography } from "@mui/material";

//クローズしたスレのURL開いたらそのIDは存在しません処理がいるかも

const FindCardStyle = css`
  width: 400px;
  border: solid 1px #2d2d2d;
  border-radius: 4px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
`;

const ThreadId = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const tid = applyThreadID(id);

  const { thread, isLoadingThread, isErrorThread } = useThread(tid);
  // const { user, isErrorUser, isLoadingUser } = useUser(thread.threadAuthor);
  // const { comments, isLoadingComments, isErrorComments } = useComments(tid);

  if (isLoadingThread) return <div>Loading Animation</div>;
  if (isErrorThread) return <div>Error</div>;

  return (
    <Box sx={{ minWidth: "sx", maxWidth: "500px", border: 1 }}>
      <Typography>{thread.title}</Typography>
      {thread.isPlaying ? (
        <Typography>現在プレイ中！</Typography>
      ) : (
        <Typography>現在募集中！</Typography>
      )}
      <div>モード：{thread.gameMode}</div>
      <Box>{thread.body}</Box>
      <Box>
        {!!thread.useMS ? (
          thread.useMS.map((ms, idx) => (
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
      <Typography>タッグコード:{thread.tagCode}</Typography>
      <Typography>開始日時:{thread.startedAt}</Typography>
      <Typography>終了日時:{thread.finishedAt}</Typography>
      <Typography>作成日:{thread.createdAt}</Typography>
      {thread.isVC ? (
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
      コメントエリアのコンポーネント
    </Box>
  );
};
export default ThreadId;
