"use client";

import { useState, KeyboardEvent, MouseEvent } from "react";
import { Box, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogOut from "./LogOut";
import { useRouter } from "next/navigation";
import UserAvatar from "../Account/UserAvatar";

const NavDrawer = () => {
  const [state, setState] = useState(false);
  const router = useRouter();

  const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (event.type === "keydown" && ((event as KeyboardEvent).key === "Tab" || (event as KeyboardEvent).key === "Shift")) {
      return;
    }

    setState(open);
  };

  const listItem = (route: string, icon: any, text: string) => (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => {
          router.push(`${route}`);
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {listItem("/", <HomeIcon />, "Home")}
        {listItem("/mygroups", <WorkspacesIcon />, "My Groups")}
        {listItem("/account", <AccountCircleIcon />, "My Account")}
      </List>
      <Divider />
      <List>
        <ListItem>
          <LogOut />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
      >
        <UserAvatar />
      </IconButton>

      <Drawer
        open={state}
        anchor="right"
        onClose={toggleDrawer(false)}
      >
        {list}
      </Drawer>
    </div>
  );
};

export default NavDrawer;
