import { signIn, useSession } from "next-auth/react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import DrawerNavigator from "./DrawerNavigator";

const Header = () => {
  // ハンバーガーメニューも作りたい
  // li追加していく感じで
  // アイテムはリストページ、プロフィールページ、ユーザ検索、お問い合わせページ、関連リンク、ログアウトとか？
  const [drawer, setDrawer] = useState(false);

  const { data: session, status } = useSession();
  const loading = status === "loading";
  if (loading) return null;
  return (
    <div>
      <DrawerNavigator
        session={session}
        setDrawer={setDrawer}
        drawer={drawer}
      />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => setDrawer(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Quick-Boost
          </Typography>
          {!session && (
            <Button color="inherit" onClick={() => signIn("twitter")}>
              ログイン
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
