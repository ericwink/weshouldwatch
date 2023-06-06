"use client";

import * as React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material/";
import NavDrawer from "./NavDrawer";
import SearchBar from "./SearchBar/SearchBar";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <NavDrawer />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            WSW...
          </Typography>
          <SearchBar />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
