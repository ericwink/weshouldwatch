"use client";

import { AppBar, Box, Toolbar } from "@mui/material/";
import NavDrawer from "./NavDrawer";
import SearchBar from "./SearchBar";
import UserAvatar from "./UserAvatar";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <NavDrawer />
          <SearchBar />
          <UserAvatar />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
