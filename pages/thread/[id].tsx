import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useThread } from "../../hooks/swrHooks";
import { findMobileSuitFromMSID, MSImagePath } from "../../types/MobileSuit";
import { Alert, AlertTitle, Box, Paper, Typography } from "@mui/material";
import CommentsArea from "../../components/CommentsArea";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import connectDB from "../../db/connectDB";
import { UserType } from "../../types/UserType";
import User from "../../db/models/User";
import NotSignIn from "../../components/NotSignIn";
import { Oval } from "react-loader-spinner";

interface Props {
  user: UserType;
}

const ThreadId = (props: Props) => {
  const router = useRouter();
  const tid = router.query.id as string;

  const { thread, isLoadingThread, isErrorThread } = useThread(tid);
  const [alert, setAlert] = useState(false);
  if (isLoadingThread) return <Oval color="#00BFFF" height={80} width={80} />;
  if (isErrorThread) return <div>Error</div>;

  const copyClipboard = () => {
    navigator.clipboard.writeText(thread.tagCode);
    setAlert(true);
    setTimeout(() => setAlert(false), 3000);
  };

  return (
    <Paper sx={{ border: 0.5 }}>
      <NotSignIn>
        {alert && (
          <Alert severity="info">
            <AlertTitle>コピー完了</AlertTitle>
            タッグコードをクリップボードにコピーしました！
          </Alert>
        )}
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
          <Typography onClick={() => copyClipboard()}>
            タッグコード:{thread.tagCode}
          </Typography>
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
          <CommentsArea threadID={tid} user={props.user} />
        </Box>
      </NotSignIn>
    </Paper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  await connectDB();

  if (session) {
    const user = await User.findOne({
      twitterUID: session.user.twitterUID,
    });
    const u: UserType = JSON.parse(JSON.stringify(user));

    return {
      props: {
        user: u,
      },
    };
  } else {
    return {
      props: {
        fallbackData: null,
      },
    };
  }
};

export default ThreadId;
