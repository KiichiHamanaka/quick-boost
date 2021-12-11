import React from "react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { createFind } from "../../lib/create";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

type FormValues = {
  message: string;
  body: string;
  enjoyType: string;
  isVC: string;
  wantToUse: string;
  position: string;
  start_at: string;
  end_at: string;
};

const FindNew: React.FC = () => {
  const { data: session, status } = useSession();
  const { register, handleSubmit } = useForm<FormValues>();
  const loading = status === "loading";
  if (loading) return null; //ログイン画面に飛ばす

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const req = {
      ...data,
      author: session!.user.user,
      allowUsers: [],
      created_at: dayjs(Date.now()).format("YYYY-MM-DD-HH-mm-ss"),
      isPlaying: false,
    };
    createFind(req);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("message")} />
        <input {...register("body")} />
        <input {...register("enjoyType")} />
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

export default FindNew;
