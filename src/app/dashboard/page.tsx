// tell nextJS not to cache fetch request on this page
export const revalidate = 0;

import { Container, Typography, Paper, Box } from "@mui/material";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MovieIcon from "@mui/icons-material/Movie";
import { ReactNode } from "react";
import { UserAccount } from "@/src/lib/interface";
import Link from "next/link";

const dashboard = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: session } = await supabase.auth.getSession();
  if (!session) redirect("/login");

  let user: UserAccount | null = null;
  let { data } = await supabase.from("users").select("*, user_public_profile (profile_pic, user_name)").single();

  if (data) user = data as unknown as UserAccount;

  const dashOption = (option: string, icon: ReactNode, path: string) => (
    <Link href={`/${path}`}>
      <Paper
        elevation={3}
        sx={{ p: 3, minWidth: "300px", display: "flex", alignContent: "center", justifyContent: "center" }}
      >
        <Box
          display="flex"
          alignContent="center"
          justifyContent="space-between"
          width="70%"
          maxWidth="150px"
        >
          {icon}
          {option}
        </Box>
      </Paper>
    </Link>
  );

  return (
    <main>
      <Container
        maxWidth="xs"
        sx={{ display: "flex", flexDirection: "column", gap: 3, justifyContent: "center", alignItems: "center", marginTop: 1 }}
      >
        <Typography
          variant="h3"
          component="h1"
        >
          Dashboard
        </Typography>
        {user && <Typography>Hi {user?.user_public_profile?.user_name}!</Typography>}
        <Grid
          container
          spacing={1}
          justifyContent="center"
          flexDirection="column"
        >
          <Grid>{dashOption("My Groups", <WorkspacesIcon />, "/mygroups")}</Grid>
          <Grid>{dashOption("Trending Media", <MovieIcon />, "/")}</Grid>
          <Grid>{dashOption("My Account", <AccountCircleIcon />, "/account")}</Grid>
          <Grid
            alignItems="center"
            justifyContent="center"
            display="flex"
          >
            <Typography
              width="90%"
              textAlign="center"
              variant="caption"
            >
              Tip: Access the <strong>quick menu</strong> from anywhere by clicking the user icon on the top right of your screen
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default dashboard;
