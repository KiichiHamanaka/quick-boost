import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useComments, useThread, useUser } from "../../hooks/swrHooks";
import { findMobileSuitFromMSID, MSImagePath } from "../../types/MobileSuit";
import { Alert, AlertTitle, Box, Paper, Typography } from "@mui/material";

const ThreadId = () => {
  const router = useRouter();
  const tid = router.query.id as string;

  const { thread, isLoadingThread, isErrorThread } = useThread(tid);
  const [alert, setAlert] = useState(false);
  if (isLoadingThread) return <div>Loading Animation</div>;
  if (isErrorThread) return <div>Error</div>;

  const copyClipboard = () => {
    navigator.clipboard.writeText(thread.tagCode);
    setAlert(true);
    setTimeout(() => setAlert(false), 3000);
  };

  return (
    <div>
      {alert && (
        <Alert severity="error">
          <AlertTitle>コピー完了</AlertTitle>
          タッグコードをクリップボードにコピーしました！
        </Alert>
      )}
      <Paper
        sx={{ minWidth: "sx", border: 0.5 }}
        onClick={() => copyClipboard()}
      >
        <Box>
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
      </Paper>
    </div>
  );
};
export default ThreadId;
