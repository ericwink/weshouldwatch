import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";
import GroupMediaCard from "../components/GroupMediaCard/GroupMediaCard";
import GroupMediaCardDrawer from "../components/GroupMediaCard/GroupMediaCardDrawer";

interface Props {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const GroupTvPage = async ({ params, searchParams }: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const watched = searchParams?.watched === "true";

  let query = supabase
    .from("group_media")
    .select(`*,media(*), user_public_profile ( * )`)
    .eq("group_id", `${params.id}`)
    .eq("media.media_type", "tv");

  if (searchParams?.watched) query.eq("watched", watched);

  const tvShows = await query;

  if (tvShows.error)
    throw new Error(
      "There was an error getting your TV Shows. Please try again"
    );

  return (
    <div className="w-full flex flex-wrap gap-2 justify-center">
      {tvShows.data.map((show) => (
        <GroupMediaCard
          media={show.media}
          user={show.user_public_profile}
          key={show.id}
        >
          <GroupMediaCardDrawer
            added_reason={show.added_reason}
            user={show.user_public_profile}
            groupId={params.id}
            mediaId={show.media_id}
            mediaType="tv"
            watched={show.watched}
          />
        </GroupMediaCard>
      ))}
    </div>
  );
};

export default GroupTvPage;
