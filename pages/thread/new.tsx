import React from "react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { createThread } from "../../lib/create";
import { PlayStyle, ThreadStyle } from "../../types/Union";

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
  const loading = status === "loading";
  if (loading) return null; //ログイン画面に飛ばす

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const req = {
      ...data,
      threadAuthor: session!.user.user,
      allowUsers: [],
      created_at: dayjs(Date.now()).format("YYYY-MM-DD-HH-mm-ss"),
      isPlaying: false,
    };
    createThread(req);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("title")} />
        <input {...register("body")} />
        <input {...register("playStyle")} />
        <input {...register("threadStyle")} />
        <input {...register("isVC")} />
        <input {...register("wantToUse")} />
        <input {...register("position")} />
        <input {...register("start_at")} />
        開始日と終了日は同一である必要があります
        <input {...register("end_at")} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default ThreadNew;
