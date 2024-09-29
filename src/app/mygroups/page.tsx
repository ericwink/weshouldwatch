// tell nextJS not to cache fetch request on this page
export const revalidate = 0;

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import MakeGroup from "./components/MakeGroup";
import GroupCard from "./components/GroupCard";
import { Database } from "@/src/lib/database.types";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

const GroupsPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: session } = await supabase.auth.getSession();
  if (!session) redirect("/login");

  let { data: groups, error } = await supabase
    .from("group")
    .select(
      "*, group_media(media_id, media(media_type)), user_group_join(group_id, user_id)"
    );
  if (error) console.log(error);

  let createdGroups = 0;
  let joinedGroups = 0;
  const groupsSummary = groups?.map((group) => {
    const groupSummary = {
      id: group.id,
      group_name: group.group_name,
      created_by: group.created_by,
      group_media: { movie: 0, tv: 0 },
      members: group.user_group_join.length,
    };

    group.group_media.forEach((media) =>
      media.media?.media_type === "tv"
        ? groupSummary.group_media.tv++
        : groupSummary.group_media.movie++
    );
    if (group.created_by === session.session?.user.id) {
      createdGroups++;
    } else {
      joinedGroups++;
    }
    return groupSummary;
  });

  let { data: user, error: userError } = await supabase
    .from("users")
    .select("is_subscribed")
    .single();

  const showLocks =
    (!user?.is_subscribed && createdGroups > 1) ||
    (!user?.is_subscribed && joinedGroups > 1);

  const usersGroups = () => {
    if (groups?.length! < 1) return <div>No Groups Yet!</div>;
    return (
      <Grid container spacing={1} justifyContent="center">
        {groupsSummary?.map((group) => (
          <GroupCard key={group.id} showLock={showLocks} {...group} />
        ))}
      </Grid>
    );
  };

  return (
    <main>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h2" m={1}>
          My Groups
        </Typography>
        {usersGroups()}
        <MakeGroup />
      </Container>
    </main>
  );
};

export default GroupsPage;
