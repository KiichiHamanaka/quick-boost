import Link from "next/link";
import { css } from "@emotion/react";

const indexCard = css`
  width: 400px;
  border: solid 1px #2d2d2d;
  border-radius: 4px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
`;

const Button = css`
  width: 400px;
  border: solid 1px #2d2d2d;
  border-radius: 4px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
`;

const Introduction = () => {
  return (
    <div>
      <div>Welcome to QuickBoost</div>
      <div css={indexCard}>
        <h3>Whats QuickBoost?</h3>
        QuickBoostはクロスブーストで固定の相方を見つけるためのサービスです
        家庭用から始めたもののゲームセンターに知り合いがいない
        シャッフルはしたくないけど知らない人に声を掛けづらい
        同じモチベーションで一緒にガンダムをしたい人を探すのにピッタリのサービスです
      </div>

      <div css={indexCard}>
        <h3>すぐ見つかる</h3>
        エンジョイ戦もガチ戦も簡単に誘えます
      </div>

      <div css={indexCard}>
        <h3>クソマナーを許さない</h3>
        募集した相方に捨てゲーや誤射を狙いシャゲダンされてクソあったまった
        QuickBoostはログインにTwitterアカウントが必要です
        カスプレイヤーは容赦無くSNS上に晒しあげましょう
      </div>

      <Link href={"/find"} passHref>
        <div css={Button}>相方を探す</div>
      </Link>
    </div>
  );
};

export default Introduction;
