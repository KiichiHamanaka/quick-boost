import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, SwipeableDrawer, useMediaQuery } from "@mui/material";
import { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";
import { useTheme } from "@mui/system";

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
  { text: "ログアウト", url: "/api/auth/signOut" },
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
            <ListItem button>
              <ListItemIcon>
                <Avatar
                  alt={props.session.user.twitterName}
                  src={props.session.user.image}
                />
              </ListItemIcon>
              <ListItemText
                primary={`${props.session.user.twitterName}@${props.session.user.twitterId}`}
              />
            </ListItem>
          </List>
        )}
        <Divider />
        <List>
          {menuItem.map((obj, index) => (
            <ListItem button key={obj.text}>
              <ListItemText primary={obj.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  );
};

export default DrawerNavigator;
