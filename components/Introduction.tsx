import Link from "next/link";
import { Paper, Theme, Typography } from "@mui/material";

const indexCard = {
  minWidth: "sx",
  maxWidth: "400px",
  boxShadow: 1,
  borderRadius: 0.5,
  border: 0.5,
};

const Introduction = () => {
  return (
    <div>
      <Paper sx={indexCard}>
        <Typography variant="h5">Whats QuickBoost?</Typography>
        QuickBoostはクロスブーストで固定の相方を見つけるためのサービスです
        家庭用から始めたもののゲームセンターに知り合いがいない
        シャッフルはしたくないけど知らない人には声を掛けづらい
        同じモチベーションで一緒にガンダムをしたい人を探すのにピッタリのサービスです
      </Paper>

      <Paper sx={indexCard}>
        <Typography variant="h5">すぐ見つかる</Typography>
        エンジョイ戦もガチ戦も簡単に誘えます
      </Paper>
      <Paper sx={indexCard}>
        <Typography variant="h5">Twitter必須</Typography>
        相方に捨てゲーや故意の誤射、シャゲダンされてクソあったまってしまった
        QuickBoostを使うにはTwitterアカウントでのログインが必要です
        一定の民度が確保された空間で遊ぶことができます
      </Paper>

      <Link href={"/thread"} passHref>
        <Typography variant="h5">相方を探す</Typography>
      </Link>
    </div>
  );
};

export default Introduction;
