"use client";

import { AppBar, Box, Toolbar, Button } from "@mui/material/";
import NavDrawer from "./NavDrawer";
import SearchBar from "./SearchBar";
import UserAvatar from "./Account/UserAvatar";
import Link from "next/link";
import { useUserAccount } from "../lib/tanstackHooks";

const NavBar = () => {
  const { data: user } = useUserAccount();

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
