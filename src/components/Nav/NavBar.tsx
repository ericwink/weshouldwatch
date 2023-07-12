"use client";

import { AppBar, Toolbar, Button } from "@mui/material/";
import NavDrawer from "./NavDrawer";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { useUserStore } from "@/src/lib/store";
import { useQuery } from "@tanstack/react-query";
import { getUserAccount } from "@/src/lib/supabaseClientHelper";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const NavBar = () => {
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);
  const supabase = createClientComponentClient();

  const { isLoading } = useQuery({
    queryFn: async () => {
      const data = await getUserAccount();
      setUser(data);
    },
  });

  return (
    <nav>
      <AppBar position="sticky">
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
