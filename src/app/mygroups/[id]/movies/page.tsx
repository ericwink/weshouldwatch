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

const GroupMoviesPage = async ({ params, searchParams }: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const watched = searchParams?.watched === "true";

  let query = supabase
    .from("group_media")
    .select(`*,media(*), user_public_profile ( * )`)
    .eq("group_id", `${params.id}`)
    .eq("media.media_type", "movie");

  if (searchParams?.watched) query.eq("watched", watched);

  const movies = await query;

  if (movies.error)
    throw new Error("There was an error getting your movies. Please try again");

  return (
    <div className="w-full flex flex-wrap gap-2 justify-center">
      {movies.data.map((movie) => (
        <GroupMediaCard
          media={movie.media}
          user={movie.user_public_profile}
          key={movie.id}
        >
          <GroupMediaCardDrawer
            added_reason={movie.added_reason}
            user={movie.user_public_profile}
            groupId={params.id}
            mediaId={movie.media_id}
            mediaType="movie"
            watched={movie.watched}
          />
        </GroupMediaCard>
      ))}
    </div>
  );
};

export default GroupMoviesPage;
