import React, { useState } from "react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { PlayStyle, ThreadStyle } from "../../types/Union";
import { findMobileSuitFromMSID, MobileSuit } from "../../types/MobileSuit";
import MSDialog from "../../components/dialog/MSSearchDialog";
import useSelectMSBox from "../../hooks/useSelectMSBox";
import { Box, Button, Typography } from "@mui/material";
import ShowMSImage from "../../components/selectMS/showMSImager";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

type FormValues = {
  title: string;
  body: string;
  playStyle: PlayStyle;
  threadStyle: ThreadStyle;
  isVC: boolean;
  wantToUse: string;
  position: string;
  start_at: string;
  end_at: string;
};

const ThreadNew: React.FC = () => {
  const { data: session, status } = useSession();
  const { register, handleSubmit } = useForm<FormValues>();
  const [isShowMSBOX, setIsShowMSBOX] = useState<boolean>(false);
  const { useMS } = useSelectMSBox();
  const loading = status === "loading";
  if (loading) return null; //ログイン画面に飛ばす

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const req = {
      ...data,
      threadAuthor: session!.user,
      allowUsers: [],
      useMS,
      isPlaying: false,
    };
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
        VC有無
        <input {...register("isVC")} />
        <ShowMSImage
          MobileSuits={useMS.map((ms) => findMobileSuitFromMSID(ms))}
        />
        募集立ち回り
        <input {...register("position")} />
        開始日
        <input {...register("start_at")} />
        終了日
        <input {...register("end_at")} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default ThreadNew;
