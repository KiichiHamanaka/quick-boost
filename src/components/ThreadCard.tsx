import Link from "next/link";
import Image from "next/image";
import { ThreadType } from "../types/thread/ThreadType";
import { findMobileSuitFromMSID, MSImagePath } from "../types/MobileSuit";
import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { PlayStyle } from "../types/Union";
import { blue, red, cyan } from "@mui/material/colors";
import { useTheme } from "@mui/system";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

type ThreadProps = {
  thread: ThreadType;
};

const ThreadCard = (props: ThreadProps) => {
  const bgColor = (ps: PlayStyle) => {
    switch (ps) {
      case "どちらでも":
        return cyan[50];
      case "エンジョイ":
        return blue[200];
      case "ガチ":
        return red[200];
    }
  };
  const theme = useTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down("sm"));

  const RenderMSNum: number = !isMobileSize ? 5 : (2 as Readonly<number>);
  const CardHeight: number = 280;
  const CardWidth: number = 600;

  return (
    <Link href={`/thread/${props.thread._id}`} passHref>
      <Card
        sx={{
          height: isMobileSize ? 1 : `${CardHeight}px`,
          minWidth: CardWidth,
          boxShadow: 1,
          background: `linear-gradient(${bgColor(
            props.thread.playStyle
          )}, #FFFFFF)`,
        }}
      >
        <Grid container sx={{ display: "flex" }}>
          <Grid
            container
            sx={{ display: "flex", flexDirection: "column" }}
            item
            xs={6}
            md={6}
          >
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {props.thread.title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {props.thread.threadAuthor._id}
              </Typography>
              {props.thread.isPlaying ? (
                <Typography>現在プレイ中！</Typography>
              ) : (
                <Typography>現在募集中！</Typography>
              )}
              {props.thread.position === "どちらでも" ? (
                <Typography>前衛後衛募集中！</Typography>
              ) : (
                <Typography>{props.thread.position}募集中！</Typography>
              )}
              <div>モード：{props.thread.gameMode}</div>
              <Typography>
                開始日時:
                {dayjs(props.thread.startedAt).format("YYYY/MM/DD HH:mm")}
              </Typography>
              <Typography>
                終了日時:
                {dayjs(props.thread.finishedAt).format("YYYY/MM/DD HH:mm")}
              </Typography>
            </CardContent>
          </Grid>
          <Grid
            container
            sx={{ display: "flex", flexDirection: "column" }}
            item
            xs={6}
            md={6}
          >
            <Box sx={{ height: CardHeight / 2 }}>
              <Typography>スレ主使用機体</Typography>
              {props.thread.useMS.length > RenderMSNum ? (
                <Box>
                  {props.thread.useMS
                    .filter((ms, idx) => idx < RenderMSNum)
                    .map((ms, idx) => (
                      <Image
                        key={idx}
                        src={MSImagePath(findMobileSuitFromMSID(ms))}
                        alt={findMobileSuitFromMSID(ms).name}
                        loading={"lazy"}
                        width={106}
                        height={52}
                      />
                    ))}
                  <Image
                    src={"/assets/Image/MS/etc/many.png"}
                    alt={"too many"}
                    loading={"lazy"}
                    width={106}
                    height={52}
                  />
                </Box>
              ) : props.thread.useMS.length ? (
                props.thread.useMS.map((ms, idx) => (
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
                <Typography>合わせます</Typography>
              )}
            </Box>
            <Box sx={{ height: CardHeight / 2 }}>
              <Typography>募集機体</Typography>
              {props.thread.useMS.length > RenderMSNum ? (
                <Box>
                  {props.thread.useMS
                    .filter((ms, idx) => idx < RenderMSNum)
                    .map((ms, idx) => (
                      <Image
                        key={idx}
                        src={MSImagePath(findMobileSuitFromMSID(ms))}
                        alt={findMobileSuitFromMSID(ms).name}
                        loading={"lazy"}
                        width={106}
                        height={52}
                      />
                    ))}
                  <Image
                    src={"/assets/Image/MS/etc/many.png"}
                    alt={"too many"}
                    loading={"lazy"}
                    width={106}
                    height={52}
                  />
                </Box>
              ) : props.thread.useMS.length ? (
                props.thread.useMS.map((ms, idx) => (
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
                <Typography>合わせます</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
};

export default ThreadCard;
