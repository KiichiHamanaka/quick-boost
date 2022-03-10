import * as React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Avatar,
  ListItem,
  SwipeableDrawer,
  useMediaQuery,
} from "@mui/material";
import { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";
import { useTheme } from "@mui/system";
import { signOut } from "next-auth/react";

type Props = {
  setDrawer: Dispatch<SetStateAction<boolean>>;
  drawer: boolean;
  session?: Session | null;
};

type MenuObject = {
  text: string;
  url: string;
};

const menuItem: Array<MenuObject> = [
  { text: "相方検索", url: "/thread" },
  { text: "相方募集", url: "/thread/new" },
];

const DrawerNavigator = (props: Props) => {
  const theme = useTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <SwipeableDrawer
      anchor={isMobileSize ? "top" : "left"}
      onClose={() => props.setDrawer(false)}
      onOpen={() => props.setDrawer(true)}
      open={props.drawer}
    >
      <Box
        sx={{ width: isMobileSize ? "auto" : 250 }}
        role="presentation"
        onClick={() => props.setDrawer(false)}
      >
        {props.session && (
          <List>
            <Link href={`/user/${props.session.user.id}`} passHref>
              <ListItem button>
                <ListItemIcon>
                  <Avatar
                    alt={props.session.user.name}
                    src={props.session.user.image}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`${props.session.user.name}@${props.session.user.twitterId}`}
                />
              </ListItem>
            </Link>
          </List>
        )}
        <Divider />
        <List>
          {menuItem.map((obj) => (
            <Link key={obj.text} href={obj.url} passHref>
              <ListItem button>
                <ListItemText primary={obj.text} />
              </ListItem>
            </Link>
          ))}
          {props.session && (
            <ListItem button onClick={() => signOut()}>
              <ListItemText primary={"ログアウト"} />
            </ListItem>
          )}
        </List>
      </Box>
    </SwipeableDrawer>
  );
};

export default DrawerNavigator;
