import Link from "next/link";
import { css } from "@emotion/react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

// ログインしてたら最初からリストの方に飛ばす

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

const IndexPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) return null;
  if (session) router.push("/find");

  return (
    <div>
      <div>Welcome to QuickBoost</div>
      <div css={indexCard}>
        <h3>Whats QuickBoost?</h3>
        QuickBoostはクロスブーストで固定の相方を見つけるためのサービスです
        家庭用から始めたもののゲームセンターに知り合いはいない
        シャッフルはしたくないけど知らない人に声を掛けづらい
        同じモチベーションで一緒にガンダムをしたい人を探すのにピッタリのサービスです
      </div>

      <Link href={"/find"} passHref>
        <div css={Button}>相方を探す</div>
      </Link>
    </div>
  );
};

export default IndexPage;
