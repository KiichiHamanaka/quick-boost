import React, { useEffect, useState } from "react";
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
import connectDB from "../../db/connectDB";
import NotSignIn from "../../components/NotSignIn";
import { useRouter } from "next/router";
import RhfTextInput from "../../components/RhfInput/RhfTextInput";
import RhfSelectInput from "../../components/RhfInput/RhfSelectInput";
import {
  gameMode,
  playStyle,
  position,
  threadStyle,
} from "../../db/data/FormItems";
import RhfDatePicker from "../../components/RhfInput/RhfDatePicker";
import RhfSwitch from "../../components/RhfInput/RhfSwitch";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

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
  startedAt: Date;
  finishedAt: Date;
};

type Props = {
  fallbackData: UserType;
};

const ThreadNew: React.FC<Props> = ({ fallbackData }) => {
  const router = useRouter();
  const { status } = useSession();
  const { control, handleSubmit, formState, getValues } = useForm<FormValues>();
  const [isShowMSBOX, setIsShowMSBOX] = useState<boolean>(false);
  const { useMS, dispatch } = useSelectMSBox();
  const loading = status === "loading";

  useEffect(() => {
    dispatch({ type: "useMS", useMS: "reset" });
  }, []);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const threadCreateDTO = { ...data, threadAuthor: fallbackData._id, useMS };
    createThread(threadCreateDTO).then(() =>
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

  if (loading) return null;

  return (
    <NotSignIn>
      <MSDialog setOpen={setIsShowMSBOX} open={isShowMSBOX} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>スレッド名</Typography>
        <RhfTextInput
          name={"title"}
          control={control}
          placeholder={"スレッド名"}
        />
        <Typography>本文</Typography>
        <RhfTextInput name={"body"} control={control} placeholder={"本文"} />
        <Typography>プレイスタイル</Typography>
        <RhfSelectInput
          name={"playStyle"}
          control={control}
          menuItem={playStyle}
          defaultValue={playStyle[0]}
          helperText={"playStyle"}
        />
        <Typography>スレッドスタイル</Typography>
        <RhfSelectInput
          name={"threadStyle"}
          control={control}
          menuItem={threadStyle}
          defaultValue={threadStyle[0]}
          helperText={"threadStyle"}
        />
        <Typography>ゲームモード</Typography>
        <RhfSelectInput
          name={"gameMode"}
          control={control}
          menuItem={gameMode}
          defaultValue={gameMode[0]}
          helperText={"gameMode"}
        />
        <Typography>VC有無</Typography>
        <RhfSwitch name={"isVC"} control={control} defaultValue={false} />
        <Typography>タッグコード</Typography>
        <RhfTextInput
          name={"tagCode"}
          control={control}
          placeholder={"タッグコード"}
        />
        <Button onClick={() => setIsShowMSBOX(true)}>募集MS選択</Button>
        {!!useMS.length && (
          <ShowMSImage
            MobileSuits={useMS.map((ms) => findMobileSuitFromMSID(ms))}
          />
        )}
        <Typography>立ち回り</Typography>
        <RhfSelectInput
          name={"position"}
          control={control}
          menuItem={position}
          defaultValue={position[0]}
          helperText={"立ち回り"}
        />
        <RhfDatePicker
          name={"startedAt"}
          control={control}
          label={"開始日時"}
          defaultValue={new Date()}
        />
        <RhfDatePicker
          name={"finishedAt"}
          control={control}
          label={"終了日時"}
          defaultValue={new Date()}
        />
        <Button type="submit">送信</Button>
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
