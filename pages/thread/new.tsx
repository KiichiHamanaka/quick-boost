import React, { useState } from "react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { getSession, useSession } from "next-auth/react";
import { GameMode, PlayStyle, Position, ThreadStyle } from "../../types/Union";
import { findMobileSuitFromMSID } from "../../types/MobileSuit";
import MSDialog from "../../components/dialog/MSSearchDialog";
import useSelectMSBox from "../../hooks/useSelectMSBox";
import { Button, TextField, Typography } from "@mui/material";
import ShowMSImage from "../../components/selectMS/showMSImager";
import { createThread } from "../api/create";
import { GetServerSideProps } from "next";
import User from "../../db/models/User";
import { UserType } from "../../types/UserType";
import connectDB from "../../db/connectDB";
import NotSignIn from "../../components/NotSignIn";
import { useRouter } from "next/router";
import HookFormInput from "../../components/input/HookFormInput";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

type FormValues = {
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

const ThreadNew: React.FC<Props> = ({ fallbackData }) => {
  const router = useRouter();
  const { status } = useSession();
  const { control, register, handleSubmit } = useForm<FormValues>();
  const [isShowMSBOX, setIsShowMSBOX] = useState<boolean>(false);
  const { useMS } = useSelectMSBox();
  const loading = status === "loading";
  if (loading) return null;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    createThread({
      ...data,
      threadAuthor: fallbackData._id,
      allowUsers: [],
      isVC: true,
      useMS,
      isPlaying: false,
      startedAt: new Date(),
      finishedAt: new Date(),
    }).then(() =>
      router.push({
        pathname: "/thread",
        query: {
          alertSeverity: "info",
          alertTitle: "作成完了",
          alertDesc: `「${data.title}」で相方の募集開始しました！`,
        },
      })
    );
  };

  return (
    <NotSignIn>
      <Typography>スレッド作成のぺーじ</Typography>
      <Button onClick={() => setIsShowMSBOX(true)}>MS選択</Button>
      <MSDialog setOpen={setIsShowMSBOX} open={isShowMSBOX} />
      <form onSubmit={handleSubmit(onSubmit)}>
        スレッド名
        <HookFormInput name={"title"} control={control} />
        {/*<input {...register("title")} />*/}
        本文
        <input {...register("body")} />
        プレイスタイル
        <input {...register("playStyle")} />
        スレッドスタイル
        <input {...register("threadStyle")} />
        ゲームモード
        <input {...register("gameMode")} />
        タッグコード
        <input {...register("tagCode")} />
        <ShowMSImage
          MobileSuits={useMS.map((ms) => findMobileSuitFromMSID(ms))}
        />
        募集立ち回り
        <input {...register("position")} />
        <input type="submit" />
      </form>
    </NotSignIn>
  );
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

export default ThreadNew;
