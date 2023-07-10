"use client";

import { AppBar, Toolbar, Button } from "@mui/material/";
import NavDrawer from "./NavDrawer";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { useUserStore } from "@/src/lib/store";

const NavBar = () => {
  const user = useUserStore(state => state.user);

  return (
    <nav>
      <AppBar position="static">
        <Toolbar>
          <SearchBar />
          {user && <NavDrawer />}
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
    </nav>
  );
};

export default NavBar;
