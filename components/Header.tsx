import { signIn, signOut, useSession } from "next-auth/react";
const Header = () => {
  // ハンバーガーメニューも作りたい
  // li追加していく感じで
  // アイテムはリストページ、プロフィールページ、ユーザ検索、お問い合わせページ、関連リンク、ログアウトとか？

  const { data: session, status } = useSession();
  const loading = status === "loading";
  if (loading) return null;
  return (
    <div>
      {!session && (
        <>
          <button
            onClick={() =>
              signIn("twitter", {
                callbackUrl: "http://127.0.0.1:3000/find",
              })
            }
          >
            Twitter ログイン
          </button>
        </>
      )}
      {session && (
        <>
          <img
            src={session.user.image}
            alt={session.user.name}
            width={50}
            height={50}
          />
          {session.user.name}さん
          <button onClick={() => signOut()}>ログアウト</button>
        </>
      )}
    </div>
  );
};

export default Header;
