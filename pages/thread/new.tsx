import React from "react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { PlayStyle, ThreadStyle } from "../../types/Union";
import {
  findMobileSuitFromMSID,
  MobileSuit,
  MSImagePath,
} from "../../types/MobileSuit";
import { MSDict } from "../../db/data/MSDict";
import { nonNullable } from "../../types/util";
import UseSelectMSBox from "../../hooks/useSelectMSBox";
import Image from "next/image";

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
  const { mobileSuits, dispatch } = UseSelectMSBox();
  const { register, handleSubmit } = useForm<FormValues>();
  const loading = status === "loading";
  if (loading) return null; //ログイン画面に飛ばす

  const msDict: MobileSuit[] = Object.values(MSDict).filter(nonNullable);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const req = {
      ...data,
      threadAuthor: session!.user,
      allowUsers: [],
      created_at: dayjs(Date.now()).format("YYYY-MM-DD-HH-mm-ss"),
      isPlaying: false,
    };
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
        {mobileSuits &&
          mobileSuits.map((MS, idx) => (
            <Image key={idx} src={MSImagePath(MS)} alt={MS.name} />
          ))}
        {/*<Image src={} alt={"使用機体を追加"} />*/}
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
