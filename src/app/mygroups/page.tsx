// tell nextJS not to cache fetch request on this page
export const revalidate = 0;

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import MakeGroup from "../../components/GroupControl/MakeGroup";
import GroupCard from "@/src/components/GroupControl/GroupCard";
import { Database } from "@/src/lib/database.types";
import TabDisplay from "@/src/components/TabDisplay";
import InviteToAGroup from "@/src/components/GroupControl/InviteToAGroup";
import { Container, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

const groupsPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: session } = await supabase.auth.getSession();
  if (!session) redirect("/login");

  let { data: groups, error } = await supabase.from("group").select("*, group_media(media_id, media(media_type)), user_group_join(group_id, user_id)");
  if (error) console.log(error);

  const groupsSummary = groups?.map(group => {
    const groupSummary = {
      id: group.id,
      group_name: group.group_name,
      created_by: group.created_by,
      group_media: { movie: 0, tv: 0 },
      members: group.user_group_join.length,
    };

    group.group_media.forEach(media => (media.media?.media_type === "tv" ? groupSummary.group_media.tv++ : groupSummary.group_media.movie++));
    return groupSummary;
  });

  const usersGroups = () => {
    if (groups?.length! < 1) return <div>No Groups Yet!</div>;
    return (
      <Grid
        container
        spacing={1}
        justifyContent="center"
      >
        {groupsSummary?.map(group => (
          <GroupCard
            key={group.id}
            {...group}
          />
        ))}
      </Grid>
    );
  };

  return (
    <main>
      <Container
        maxWidth="md"
        sx={{ display: "flex", flexDirection: "column", gap: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Typography
          variant="h4"
          component="h2"
          m={1}
        >
          My Groups
        </Typography>
        {usersGroups()}
        <MakeGroup />
        <InviteToAGroup groups={groups} />
      </Container>
    </main>
  );
};

export default groupsPage;
