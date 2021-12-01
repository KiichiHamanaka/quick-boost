import Link from "next/link";

// ログインしてたら最初からリストの方に飛ばす

const IndexPage = () => {
  return (
    <div>
      QuickBoostはクロスブーストで固定の相方を見つけるためのサービスです
      シャッフルはしたくないけど知らない人に声を掛けづらい
      同じモチベーションで一緒にガンダムをしたい人を探すのにピッタリのサービスです
      <Link href={"/find"}>
        <a>相方を探してみる</a>
      </Link>
    </div>
  );
};

export default IndexPage;
