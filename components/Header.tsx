import { signIn, signOut, useSession } from "next-auth/react";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  // ハンバーガーメニューも作りたい
  // li追加していく感じで
  // アイテムはリストページ、プロフィールページ、ユーザ検索、お問い合わせページ、関連リンク、ログアウトとか？

  const { data: session, status } = useSession();
  const loading = status === "loading";
  if (loading) return null;
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* ロゴに変更 + */}
          Quick-Boost
        </Typography>
        {!session ? (
          <Button
            color="inherit"
            onClick={() =>
              signIn("twitter", {
                callbackUrl: `${process.env.NEXTAUTH_URL}/thread`,
              })
            }
          >
            ログイン
          </Button>
        ) : (
          <>
            {session.user.name}@{session.user.screen_name}
            <Avatar alt={session.user.name} src={session.user.image} />
            {/*userpageへ飛ぶ処理の追加*/}
            <Button color="inherit" onClick={() => signOut()}>
              ログアウト
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
