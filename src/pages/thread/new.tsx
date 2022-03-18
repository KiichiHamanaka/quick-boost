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

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
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
import Head from "next/head";
import { Control } from "react-hook-form/dist/types";
import { MsBoxContext } from "../../contexts/MsBoxContext";
import { PartnerMsBoxContext } from "../../contexts/PartnerMsBoxContext";

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

const FormSteps = [
  "title and body",
  "playing styles",
  "MobileSuit",
  "Date and TagCode",
] as const;

type Steps = typeof FormSteps[number];

type StepProps = {
  step: Steps;
  control: Control<FormValues>;
  data: FormValues;
  setStep: React.Dispatch<React.SetStateAction<Steps>>;
  setDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setDialog2: React.Dispatch<React.SetStateAction<boolean>>;
};

const StepForm: React.FC<StepProps> = ({
  step,
  control,
  data,
  setStep,
  setDialog,
  setDialog2,
}) => {
  switch (step) {
    case "title and body":
      return (
        <ThreadFormFirst control={control} data={data} setStep={setStep} />
      );
    case "playing styles":
      return (
        <ThreadFormSecond control={control} data={data} setStep={setStep} />
      );
    case "MobileSuit":
      return (
        <ThreadFormThird
          control={control}
          data={data}
          setStep={setStep}
          setDialog={setDialog}
          setDialog2={setDialog2}
        />
      );
    case "Date and TagCode":
      return (
        <ThreadFormFourth control={control} data={data} setStep={setStep} />
      );
    default:
      return <div>Not Found</div>;
  }
};

const ThreadNew: React.FC<Props> = ({ fallbackData }) => {
  const router = useRouter();
  const { status } = useSession();
  const { control, handleSubmit, getValues } = useForm<FormValues>();
  const [isShowMSBOX, setIsShowMSBOX] = useState<boolean>(false);
  const [isShowPartnerMSBOX, setIsShowPartnerMSBOX] = useState<boolean>(false);
  const { useMS, dispatch, partnerUseMS, partnerDispatch } = useSelectMSBox(
    MsBoxContext,
    PartnerMsBoxContext
  );
  const loading = status === "loading";
  const [step, setStep] = useState<Steps>("title and body");

  useEffect(() => {
    dispatch({ type: "useMS", useMS: "reset" });
    dispatch({ type: "useMS", useMS: "reset" });
  }, []);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const threadCreateDTO = {
      ...data,
      threadAuthor: fallbackData._id,
      useMS,
      partnerUseMS,
    };
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
      <Head>
        <title>相方募集</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MSDialog
        setOpen={setIsShowMSBOX}
        open={isShowMSBOX}
        dispatch={dispatch}
        whichOne={"self"}
      />
      <MSDialog
        setOpen={setIsShowPartnerMSBOX}
        open={isShowPartnerMSBOX}
        dispatch={partnerDispatch}
        whichOne={"partner"}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <StepForm
          control={control}
          step={step}
          data={getValues()}
          setStep={setStep}
          setDialog={setIsShowMSBOX}
          setDialog2={setIsShowPartnerMSBOX}
        />
      </form>
    </NotSignIn>
  );
};

type StepFormProps = {
  control: Control<FormValues>;
  data: FormValues;
  setStep: React.Dispatch<React.SetStateAction<Steps>>;
};

type Step2nd = StepFormProps & {
  setDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setDialog2: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThreadFormFirst: React.FC<StepFormProps> = ({
  control,
  data,
  setStep,
}) => {
  return (
    <Box p={2}>
      <Card>
        <CardContent>
          <Grid container spacing={2} p={2}>
            <Grid item xs={6} sm={6}>
              <Typography>スレッド名</Typography>
              <RhfTextInput
                name={"title"}
                control={control}
                placeholder={"スレッド名"}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography>タッグコード</Typography>
              <RhfTextInput
                name={"tagCode"}
                control={control}
                placeholder={"タッグコード"}
                defaultValue={data.tagCode}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography>本文</Typography>
              <RhfTextInput
                name={"body"}
                control={control}
                placeholder={"本文"}
                minRows={8}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button onClick={() => setStep("playing styles")}>次へ</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

const ThreadFormSecond: React.FC<StepFormProps> = ({ control, setStep }) => {
  return (
    <Box p={2}>
      <Card>
        <CardContent>
          <Grid container spacing={2} p={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography>プレイスタイル</Typography>
                <RhfSelectInput
                  name={"playStyle"}
                  control={control}
                  menuItem={playStyle}
                  defaultValue={playStyle[0]}
                  helperText={"playStyle"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>スレッドスタイル</Typography>
                <RhfSelectInput
                  name={"threadStyle"}
                  control={control}
                  menuItem={threadStyle}
                  defaultValue={threadStyle[0]}
                  helperText={"threadStyle"}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography>ゲームモード</Typography>
                <RhfSelectInput
                  name={"gameMode"}
                  control={control}
                  menuItem={gameMode}
                  defaultValue={gameMode[0]}
                  helperText={"gameMode"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>立ち回り</Typography>
                <RhfSelectInput
                  name={"position"}
                  control={control}
                  menuItem={position}
                  defaultValue={position[0]}
                  helperText={"立ち回り"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>VC有無</Typography>
                <RhfSwitch
                  name={"isVC"}
                  control={control}
                  defaultValue={false}
                />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button onClick={() => setStep("title and body")}>戻る</Button>
          <Button onClick={() => setStep("MobileSuit")}>次へ</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

const ThreadFormThird: React.FC<Step2nd> = ({
  setStep,
  setDialog,
  setDialog2,
}) => {
  const { useMS, partnerUseMS, dispatch, partnerDispatch } = useSelectMSBox(
    MsBoxContext,
    PartnerMsBoxContext
  );

  return (
    <Box p={2}>
      <Card>
        <CardContent>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={6}>
              <Button onClick={() => setDialog(true)}>使用MS選択</Button>
              {!!useMS.length && (
                <ShowMSImage
                  MobileSuits={useMS.map((ms) => findMobileSuitFromMSID(ms))}
                  dispatch={dispatch}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button onClick={() => setDialog2(true)}>相方MS選択</Button>
              {!!partnerUseMS.length && (
                <ShowMSImage
                  MobileSuits={partnerUseMS.map((ms) =>
                    findMobileSuitFromMSID(ms)
                  )}
                  dispatch={partnerDispatch}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button onClick={() => setStep("playing styles")}>戻る</Button>
          <Button onClick={() => setStep("Date and TagCode")}>次へ</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

const ThreadFormFourth: React.FC<StepFormProps> = ({
  control,
  data,
  setStep,
}) => {
  return (
    <Box p={2}>
      <Card>
        <CardContent>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={6}>
              <RhfDatePicker
                name={"startedAt"}
                control={control}
                label={"開始日時"}
                defaultValue={data.startedAt || new Date()}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <RhfDatePicker
                name={"finishedAt"}
                control={control}
                label={"終了日時"}
                defaultValue={data.finishedAt || new Date()}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button onClick={() => setStep("MobileSuit")}>戻る</Button>
          <Button type="submit">送信</Button>
        </CardActions>
      </Card>
    </Box>
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
