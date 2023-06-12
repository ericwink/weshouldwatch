"use client";

import { AppBar, Box, Toolbar, Button, Typography } from "@mui/material/";
import NavDrawer from "./NavDrawer";
import SearchBar from "./SearchBar";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { useUser } from "../app/context/user";

const NavBar = () => {
  const { user } = useUser();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <NavDrawer />
          <SearchBar />
          {user && <UserAvatar />}
          {!user && (
            <Button
              color="inherit"
              size="small"
            >
              <Link href="/login">Log In</Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
