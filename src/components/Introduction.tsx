import Link from "next/link";
import { Box, Typography } from "@mui/material";
import React from "react";

const indexCard = {
  height: "400px",
  textAlign: "center",
  verticalAlign: "middle",
};

type Props = {
  title?: string;
  body?: string;
};

const IntroCard: React.FC<Props> = ({ title, body }) => {
  return (
    <Box sx={indexCard}>
      {title && <Typography variant="h4">{title}</Typography>}
      {body && body}
    </Box>
  );
};

const Introduction = () => {
  return (
    <div>
      <Box sx={indexCard}>
        <Typography variant="h2">あなたに合った相方を見つけよう</Typography>
      </Box>
      <Box sx={indexCard}>
        <Typography variant="h5">
          QuickBoostは、機動戦士ガンダムExtremeVS2
          クロスブーストを一緒にプレイする固定相方を見つけるためのサービスです。
        </Typography>
      </Box>
      <IntroCard
        title={"HOW TO USE"}
        body={
          "エンジョイもガチ戦もその時の気分に合わせて誘うことができます" +
          "パートナー急募では難しい機体選択の相談や、Discordを介しての通話でより円滑なゲームプレイを提供します"
        }
      />
      <IntroCard
        title={"Twitter必須"}
        body={
          "相方に捨てゲーや故意の誤射、シャゲダンなどでクソ暖まったことがありませんか？" +
          "QuickBoostを使うにはTwitterアカウントでのログインが必要です" +
          "PNを変えて逃げたところでTwitterIDが必須である以上、晒しリスクがあるため悪質なプレイヤーは大幅に軽減されるはずです、多分"
        }
      />
      <Link href={"/thread"} passHref>
        <IntroCard title={"相方を探す"} />
      </Link>
    </div>
  );
};

export default Introduction;
