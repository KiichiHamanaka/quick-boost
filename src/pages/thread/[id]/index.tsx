import { useState } from "react";
import AlertDialog from "../../../components/dialog/AlertDialog";
import { findMobileSuitFromMSID, MSImagePath } from "../../../types/MobileSuit";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { GetServerSideProps } from "next";
import connectDB from "../../../db/connectDB";
import { useRouter } from "next/router";
import { Oval } from "react-loader-spinner";
import { useThread } from "../../../hooks/swrHooks";
import CommentsArea from "../../../components/CommentsArea";
import NotSignIn from "../../../components/NotSignIn";
import { UserType } from "../../../types/UserType";
import { getSession } from "next-auth/react";
import Image from "next/image";
import User from "../../../db/models/User";
import { deleteThread } from "../../api/delete";

interface Props {
  user: UserType;
}

const ThreadId = (props: Props) => {
  const router = useRouter();
  const tid = router.query.id as string;

  const { thread, isLoadingThread, isErrorThread } = useThread(tid);
  const [alert, setAlert] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  if (isLoadingThread) return <Oval color="#00BFFF" height={80} width={80} />;
  if (isErrorThread) return <div>Error</div>;

  const copyClipboard = () => {
    navigator.clipboard.writeText(thread.tagCode);
    setAlert(true);
    setTimeout(() => setAlert(false), 3000);
  };

  return (
    <Paper sx={{ border: 0.5 }}>
      <AlertDialog
        open={editDialog}
        setOpen={setEditDialog}
        title={"スレッド編集"}
        text={"この募集を編集しますか？"}
        event={() => router.push(`/thread/${tid}/edit`)}
      />
      <AlertDialog
        open={deleteDialog}
        setOpen={setDeleteDialog}
        title={"スレッド削除"}
        text={"この募集を削除しますか？"}
        event={() =>
          deleteThread(tid).then(() =>
            router.push({
              pathname: "/thread",
              query: {
                alertSeverity: "success",
                alertTitle: "削除完了",
                alertDesc: `スレッド「${thread.title}」を削除しました。`,
              },
            })
          )
        }
      />
      <NotSignIn>
        {alert && (
          <Alert severity="info">
            <AlertTitle>コピー完了</AlertTitle>
            タッグコードをクリップボードにコピーしました！
          </Alert>
        )}
        <Box>
          {thread.threadAuthor._id === props.user._id && (
            <div>
              <Button onClick={() => setEditDialog(true)}>編集</Button>
              <Button onClick={() => setDeleteDialog(true)}>削除</Button>
            </div>
          )}
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
