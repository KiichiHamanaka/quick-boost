import React, { useState } from "react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useForm, SubmitHandler } from "react-hook-form";
import { getSession, useSession } from "next-auth/react";
import { GameMode, PlayStyle, Position, ThreadStyle } from "../../types/Union";
import { findMobileSuitFromMSID } from "../../types/MobileSuit";
import MSDialog from "../../components/dialog/MSSearchDialog";
import useSelectMSBox from "../../hooks/useSelectMSBox";
import { Button, Typography } from "@mui/material";
import ShowMSImage from "../../components/selectMS/showMSImager";
import { createThread } from "../api/create";
import { GetServerSideProps } from "next";
import User from "../../db/models/User";
import { UserType } from "../../types/UserType";

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

interface Props {
  fallbackData: UserType;
}

const ThreadNew: React.FC<Props> = ({ fallbackData }) => {
  const { data: session, status } = useSession();
  const { register, handleSubmit } = useForm<FormValues>();
  const [isShowMSBOX, setIsShowMSBOX] = useState<boolean>(false);
  const { useMS } = useSelectMSBox();

  const loading = status === "loading";
  if (loading) return null; //ログイン画面に飛ばす

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
    });
  };

  return (
    <div>
      <Typography>スレッド作成のぺーじ</Typography>
      <Button onClick={() => setIsShowMSBOX(true)}>MS選択</Button>
      <MSDialog setOpen={setIsShowMSBOX} open={isShowMSBOX} />
      <form onSubmit={handleSubmit(onSubmit)}>
        スレッド名
        <input {...register("title")} />
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
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    const user = await User.findOne({
      twitterUID: session.twitterUID as number,
    });
    return {
      props: {
        fallbackData: user,
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
