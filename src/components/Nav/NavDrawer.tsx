"use client";

import { useState, KeyboardEvent, MouseEvent } from "react";
import { Box, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import LogOut from "./LogOut";
import { useRouter } from "next/navigation";
import UserAvatar from "../Account/UserAvatar";
import Footer from "../Footer";
import MovieIcon from "@mui/icons-material/Movie";

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
      sx={{ width: 250, pb: "5px" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {listItem("/dashboard", <HomeIcon />, "Dashboard")}
        {listItem("/mygroups", <WorkspacesIcon />, "My Groups")}
        {listItem("/", <MovieIcon />, "Trending")}
        {listItem("/account", <AccountCircleIcon />, "My Account")}
        {listItem("/pricing", <WorkspacePremiumIcon />, "Get Premium")}
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
        sx={{ position: "relative" }}
      >
        {list}
        <Footer />
      </Drawer>
    </div>
  );
};

export default NavDrawer;
