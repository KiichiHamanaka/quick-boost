import React from "react";
import axios from "axios";
import { useThread } from "../../../hooks/swrHooks";
import { useRouter } from "next/router";
import { Oval } from "react-loader-spinner";
import {
  GameMode,
  PlayStyle,
  Position,
  ThreadStyle,
} from "../../../types/Union";
import { UserType } from "../../../types/UserType";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import connectDB from "../../../db/connectDB";
import User from "../../../db/models/User";

export type FormValues = {
  title: string;
  body: string;
  playStyle: PlayStyle;
  threadStyle: ThreadStyle;
  isVC: boolean;
  tagCode: string;
  useMS: string;
  gameMode: GameMode;
  position: Position;
};

type Props = {
  fallbackData: UserType;
};

const ThreadEdit: React.FC = () => {
  const router = useRouter();
  const tid = router.query.id as string;

  const { thread, isLoadingThread, isErrorThread } = useThread(tid);

  if (isLoadingThread) return <Oval color="#00BFFF" height={80} width={80} />;
  if (isErrorThread) return <div>Error</div>;
  return <div>まだだよ</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  await connectDB();
  if (session) {
    const user = await User.findOne({
      twitterUID: session.user.twitterUID,
    });
    const u = JSON.parse(JSON.stringify(user));
    return {
      props: {
        fallbackData: u,
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

export default ThreadEdit;
