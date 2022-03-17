import Link from "next/link";
import { Box, Container, Grid, Typography } from "@mui/material";

const indexCard = {
  minHeight: "400px",
  textAlign: "center",
  padding: "8px 20px",
};

const Introduction = () => {
  return (
    <Container>
      <Box sx={indexCard}>
        <Typography variant="h2">相方を見つけよう</Typography>
        <Typography variant="h5">
          QuickBoostは、機動戦士ガンダムExtremeVS2
          クロスブーストを一緒にプレイする固定相方を見つけるためのサービスです。
        </Typography>
      </Box>
      <Box sx={indexCard}>
        <Typography variant="h5">HOW TO USE</Typography>
        エンジョイ戦もガチ戦も簡単に誘えます
      </Box>
      <Box sx={indexCard}>
        <Typography variant="h5">Twitter必須</Typography>
        相方に捨てゲーや故意の誤射、シャゲダンされてクソあったまってしまった
        QuickBoostを使うにはTwitterアカウントでのログインが必要です
        一定の民度が確保された空間で遊ぶことができます
      </Box>
      <Link href={"/thread"} passHref>
        <Box sx={indexCard}>
          <Typography variant="h5">相方を探す</Typography>
        </Box>
      </Link>
    </Container>
  );
};

export default Introduction;
